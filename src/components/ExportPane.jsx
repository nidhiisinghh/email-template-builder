import React, { useState } from 'react';
import { sendTemplateEmail } from '../utils/api';

export default function ExportPane({ blocks, templateId }) {
  const [exportFormat, setExportFormat] = useState('html');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailStatus, setEmailStatus] = useState({ type: '', message: '' });

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
          html += `      <div ${style}><img src="${block.content}" alt="Email content" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZjI4MiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjMzMzIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM2NjYiPlVybDogJHtibG9jay5jb250ZW50fTwvdGV4dD48L3N2Zz4=';this.style.backgroundColor='#fff2f2';this.style.objectFit='contain';" /></div>\n`;
          break;
        case 'button':
          html += `      <div ${style}><a href="${block.styles.link || '#'}" style="display: inline-block; padding: 10px 20px; background-color: ${block.styles.backgroundColor || '#f0f0f0'}; color: ${block.styles.color || '#333333'}; text-decoration: none; border: 1px solid #cccccc; border-radius: 4px;">${block.content}</a></div>\n`;
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

  const handleSendEmail = async () => {
    if (!recipientEmail || !emailSubject) {
      setEmailStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    if (!templateId) {
      setEmailStatus({ type: 'error', message: 'Please save the template first' });
      return;
    }

    try {
      setEmailStatus({ type: 'loading', message: 'Sending email...' });
      const response = await sendTemplateEmail(templateId, recipientEmail, emailSubject);
      setEmailStatus({ type: 'success', message: response.message || 'Email sent successfully!' });
      setTimeout(() => {
        setShowEmailModal(false);
        setRecipientEmail('');
        setEmailSubject('');
        setEmailStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Email sending error:', error);
      setEmailStatus({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Failed to send email'
      });
    }
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
              <h3>Preview ({exportFormat.toUpperCase()}):</h3>
              <pre>
                {exportFormat === 'html'
                  ? generateHTML().substring(0, 1000) + (generateHTML().length > 1000 ? '...' : '')
                  : generateJSON().substring(0, 1000) + (generateJSON().length > 1000 ? '...' : '')}
              </pre>
            </div>

            <div className="export-actions">
              <button className="export-btn" onClick={handleExport}>
                Export as {exportFormat.toUpperCase()}
              </button>
              <button className="send-email-btn" onClick={() => setShowEmailModal(true)}>
                Send Email
              </button>
            </div>
          </>
        )}

        {/* Email Modal */}
        {showEmailModal && (
          <div className="email-modal">
            <div className="modal-content">
              <h3>Send Email Template</h3>
              <div className="form-group">
                <label>Recipient Email:</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                />
              </div>
              <div className="form-group">
                <label>Subject:</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>

              {emailStatus.message && (
                <div className={`status-message ${emailStatus.type}`}>
                  {emailStatus.message}
                </div>
              )}

              <div className="modal-actions">
                <button
                  className="btn-send"
                  onClick={handleSendEmail}
                  disabled={emailStatus.type === 'loading'}
                >
                  {emailStatus.type === 'loading' ? 'Sending...' : 'Send Email'}
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailStatus({ type: '', message: '' });
                  }}
                  disabled={emailStatus.type === 'loading'}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
