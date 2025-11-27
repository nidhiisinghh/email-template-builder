const nodemailer = require('nodemailer');

const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const generateEmailHTML = (blocks) => {
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
    const style = `style="background-color: ${block.styles.backgroundColor}; padding: ${block.styles.padding}; font-size: ${block.styles.fontSize}; color: ${block.styles.color}; margin: 8px 0; border-radius: 4px; text-align: ${block.styles.textAlign || 'left'};"`;

    switch (block.type) {
      case 'text':
        html += `      <p ${style}>${block.content}</p>\n`;
        break;
      case 'attachment':
        html += `      <div ${style}><a href="${block.styles.link || '#'}" style="display: inline-block; padding: 12px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; text-decoration: none; color: #334155; font-family: Arial, sans-serif; font-weight: 500;">📎 ${block.content || 'Attachment'}</a></div>\n`;
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

module.exports = {
  createTransporter,
  generateEmailHTML
};
