# Email Sending Setup Guide

This guide will help you configure the nodemailer functionality to send email templates directly from the Email Builder application.

## Prerequisites

- A Gmail account (or any SMTP email provider)
- Node.js and npm installed
- The email-builder application running

## Configuration Steps

### 1. Get Gmail App Password

If you're using Gmail, you need to generate an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Under "Signing in to Google", select "App passwords"
5. Generate a new app password for "Mail"
6. Copy the 16-character password

### 2. Configure Environment Variables

Open the file `backend/.env` and update the following values:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=Email Builder <your-email@gmail.com>
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the App Password you generated

### 3. Using Other Email Providers

If you're not using Gmail, update the SMTP settings accordingly:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

**SendGrid:**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### 4. Restart the Backend Server

After updating the `.env` file, restart your backend server:

```bash
cd backend
npm run dev
```

## How to Send Emails

1. **Create/Edit a Template**: Design your email template using the drag-and-drop builder
2. **Save the Template**: Click "Save Template" to store your design
3. **Navigate to Export Tab**: Click on the "Export" tab
4. **Click "Send Email"**: A modal will appear
5. **Fill in Details**:
   - Recipient Email: Enter the recipient's email address
   - Subject: Enter the email subject line
6. **Click "Send Email"**: The template will be sent to the recipient

## Troubleshooting

### Authentication Failed
- Verify your email credentials are correct in `.env`
- Ensure you're using an App Password (not your regular Gmail password)
- Check that 2-Step Verification is enabled for Gmail

### Connection Timeout
- Check your internet connection
- Verify the SMTP host and port are correct
- Some networks block SMTP ports - try a different network

### Template Not Found
- Make sure you've saved the template before trying to send
- The "Send Email" button requires a saved template with a valid ID

## Security Notes

⚠️ **Important Security Practices:**

1. **Never commit `.env` files** to version control
2. **Use App Passwords** instead of your main email password
3. **Restrict email sending** to authenticated users only
4. **Consider rate limiting** to prevent abuse
5. **Validate recipient emails** to prevent spam

## API Endpoint

The email sending functionality uses the following endpoint:

```
POST /api/templates/:id/send
```

**Request Body:**
```json
{
  "recipientEmail": "recipient@example.com",
  "subject": "Your Email Subject"
}
```

**Response:**
```json
{
  "message": "Email sent successfully",
  "messageId": "<message-id>",
  "recipient": "recipient@example.com"
}
```

## Package Information

The email functionality uses the `nodemailer` package:
- Version: Latest (installed via npm)
- Documentation: https://nodemailer.com/
- License: MIT

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review the backend server logs
3. Verify your `.env` configuration
4. Ensure the backend server is running on the correct port (5001)
