import React, { useState } from 'react';

export default function SPABuilder({ blocks }) {
  const [includeReactCode, setIncludeReactCode] = useState(false);

  const generateReactComponent = () => {
    let code = `import React from 'react';

export default function EmailTemplate() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', padding: '20px' }}>
`;

    blocks.forEach((block) => {
      const styleStr = `{
          backgroundColor: '${block.styles.backgroundColor}',
          padding: '${block.styles.padding}',
          fontSize: '${block.styles.fontSize}',
          color: '${block.styles.color}',
          margin: '8px 0',
          borderRadius: '4px',
        }`;

      switch (block.type) {
        case 'text':
          code += `        <p style=${styleStr}>\n          ${block.content}\n        </p>\n`;
          break;
        case 'image':
          code += `        <div style=${styleStr}>\n          <img src="${block.content}" alt="Email content" style={{ maxWidth: '100%', height: 'auto' }} />\n        </div>\n`;
          break;
        case 'button':
          code += `        <div style=${styleStr}>\n          <a href="${block.styles.link || '#'}" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '${block.styles.backgroundColor}', color: '${block.styles.color}', textDecoration: 'none', borderRadius: '4px' }}>\n            ${block.content}\n          </a>\n        </div>\n`;
          break;
        case 'divider':
          code += `        <hr style={{ margin: '8px 0', border: 'none', borderTop: \`1px solid \${block.styles.color}\` }} />\n`;
          break;
        case 'spacer':
          code += `        <div style={{ height: '32px' }}></div>\n`;
          break;
        default:
          break;
      }
    });

    code += `      </div>\n    </div>\n  );\n}`;
    return code;
  };

  const generateSinglePageApp = () => {
    const componentCode = generateReactComponent();
    const appCode = `import React, { useState } from 'react';
import './App.css';
import EmailTemplate from './EmailTemplate';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Email Template</h1>
      </header>
      <main>
        <EmailTemplate />
      </main>
    </div>
  );
}

export default App;
`;

    const cssCode = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app {
  min-height: 100vh;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  color: #333;
}

main {
  display: flex;
  justify-content: center;
}
`;

    return { componentCode, appCode, cssCode };
  };

  const handleDownloadSPA = () => {
    const { componentCode, appCode, cssCode } = generateSinglePageApp();

    // Create and download component file
    downloadFile(componentCode, 'EmailTemplate.jsx', 'text/plain');
    setTimeout(() => downloadFile(appCode, 'App.jsx', 'text/plain'), 100);
    setTimeout(() => downloadFile(cssCode, 'App.css', 'text/plain'), 200);
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const { componentCode } = generateSinglePageApp();

  return (
    <div className="spa-builder">
      <div className="spa-container">
        <h2>Single Page App (SPA) Builder</h2>

        {blocks.length === 0 ? (
          <p className="empty-message">No blocks to build SPA</p>
        ) : (
          <>
            <div className="code-section">
              <h3>React Component Code</h3>
              <pre className="code-block">
                {includeReactCode ? componentCode : componentCode.substring(0, 400) + '\n...'}
              </pre>
              <button
                className="toggle-btn"
                onClick={() => setIncludeReactCode(!includeReactCode)}
              >
                {includeReactCode ? '➖ Hide Full Code' : '➕ Show Full Code'}
              </button>
            </div>

            <div className="spa-actions">
              <button className="download-btn" onClick={handleDownloadSPA}>
                📥 Download SPA Files
              </button>
              <p className="info-text">
                This will download EmailTemplate.jsx, App.jsx, and App.css files
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
