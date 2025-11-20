const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate HTML from blocks (same logic as frontend)
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

module.exports = {
  createTransporter,
  generateEmailHTML
};
