# Email Functionality Documentation

This document explains how the email sending functionality works in the Email Builder application.

## Overview

The Email Builder application uses Nodemailer to send email templates directly from the application. Users can design their email templates in the visual editor and then send them via email to recipients.

## How It Works

1. **Email Template Generation**: When a user designs an email template using the visual editor, the application generates HTML markup based on the blocks added to the canvas.

2. **Email Sending**: When a user chooses to send an email, the frontend makes a request to the backend API with the template ID, recipient email address, and subject line.

3. **Backend Processing**: The backend retrieves the template from the database, generates the HTML content, and uses Nodemailer to send the email via SMTP.

## API Endpoints

### Send Email Template
```
POST /api/templates/:id/send
```

**Request Body:**
```json
{
  "recipientEmail": "recipient@example.com",
  "subject": "Email Subject"
}
```

**Response:**
```json
{
  "message": "Email sent successfully",
  "messageId": "<unique-message-id>",
  "recipient": "recipient@example.com"
}
```

## Configuration

To enable email functionality, you need to configure the following environment variables in your `.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM="Email Builder" <no-reply@example.com>
```

### Gmail Configuration Example
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM="Your Name" <your-gmail-address@gmail.com>
```

**Note**: For Gmail, you need to use an App Password instead of your regular password. Enable 2-factor authentication and generate an App Password in your Google Account settings.

### Other Email Providers

Most email providers support SMTP. Here are common configurations:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

## Security Considerations

1. **Environment Variables**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

2. **App Passwords**: Always use app-specific passwords rather than your main account password.

3. **Rate Limiting**: Be aware of your email provider's sending limits to avoid account suspension.

## Error Handling

The application handles common email sending errors:

- Authentication failures (EAUTH)
- Connection refused (ECONNREFUSED)
- Host not found (ENOTFOUND)

Each error returns a user-friendly message to help diagnose configuration issues.

## Testing

To test email functionality:

1. Configure your `.env` file with valid SMTP credentials
2. Create and save an email template
3. Click "Send Email" in the Export pane
4. Enter a recipient email and subject
5. Click "Send Email"

Check the backend console for detailed logging of email sending operations.