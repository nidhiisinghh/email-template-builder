import React, { useState } from 'react';

export default function ExportPane({ blocks }) {
  const [exportFormat, setExportFormat] = useState('html');

  const generateHTML = () => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #f5f5f5;
    }
    .email-content {
      background-color: white;
      padding: 20px;
    }
    button {
      cursor: pointer;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-content">
`;

    blocks.forEach((block) => {
      const style = `style="background-color: ${block.styles.backgroundColor}; padding: ${block.styles.padding}; font-size: ${block.styles.fontSize}; color: ${block.styles.color}; margin: 8px 0; border-radius: 4px;"`;

      switch (block.type) {
        case 'text':
          html += `      <p ${style}>${block.content}</p>\n`;
          break;
        case 'image':
          html += `      <div ${style}><img src="${block.content}" alt="Email content" /></div>\n`;
          break;
        case 'button':
          html += `      <div ${style}><a href="${block.styles.link || '#'}" style="display: inline-block; padding: 10px 20px; background-color: ${block.styles.backgroundColor}; color: ${block.styles.color}; text-decoration: none; border-radius: 4px;">${block.content}</a></div>\n`;
          break;
        case 'divider':
          html += `      <hr style="margin: 8px 0; border: none; border-top: 1px solid ${block.styles.color};" />\n`;
          break;
        case 'spacer':
          html += `      <div style="height: 32px;"></div>\n`;
          break;
        default:
          break;
      }
    });

    html += `    </div>
  </div>
</body>
</html>`;

    return html;
  };

  const generateJSON = () => {
    return JSON.stringify(blocks, null, 2);
  };

  const handleExport = () => {
    let content = '';
    let filename = '';
    let mimeType = '';

    if (exportFormat === 'html') {
      content = generateHTML();
      filename = 'email-template.html';
      mimeType = 'text/html';
    } else if (exportFormat === 'json') {
      content = generateJSON();
      filename = 'email-template.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="export-pane">
      <div className="export-container">
        <h2>Export Email Template</h2>

        {blocks.length === 0 ? (
          <p className="empty-message">No blocks to export</p>
        ) : (
          <>
            <div className="export-options">
              <label>
                <input
                  type="radio"
                  value="html"
                  checked={exportFormat === 'html'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                HTML
              </label>
              <label>
                <input
                  type="radio"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                JSON
              </label>
            </div>

            <div className="code-preview">
              <h3>Preview:</h3>
              <pre>
                {exportFormat === 'html'
                  ? generateHTML().substring(0, 500)
                  : generateJSON().substring(0, 500)}
                ...
              </pre>
            </div>

            <button className="export-btn" onClick={handleExport}>
              📥 Export as {exportFormat.toUpperCase()}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
