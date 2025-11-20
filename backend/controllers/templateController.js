const Template = require('../models/Template');
const { createTransporter, generateEmailHTML } = require('../utils/emailConfig');

// Create a new template
exports.createTemplate = async (req, res) => {
  try {
    const { name, blocks } = req.body;
    const userId = req.user._id;

    const template = new Template({
      name,
      blocks,
      userId
    });

    await template.save();

    res.status(201).json({
      message: 'Template created successfully',
      template
    });
  } catch (error) {
    console.error('Template creation error:', error);
    res.status(500).json({ message: 'Server error creating template' });
  }
};

// Get all templates for a user
exports.getUserTemplates = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const templates = await Template.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      templates
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Server error fetching templates' });
  }
};

// Get a specific template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const template = await Template.findOne({ _id: id, userId });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({
      template
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ message: 'Server error fetching template' });
  }
};

// Update a template
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, blocks } = req.body;
    const userId = req.user._id;

    const template = await Template.findOneAndUpdate(
      { _id: id, userId },
      { name, blocks },
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({
      message: 'Template updated successfully',
      template
    });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Server error updating template' });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const template = await Template.findOneAndDelete({ _id: id, userId });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ message: 'Server error deleting template' });
  }
};

// Send template as email
exports.sendTemplateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipientEmail, subject } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!recipientEmail) {
      return res.status(400).json({ message: 'Recipient email is required' });
    }

    if (!subject) {
      return res.status(400).json({ message: 'Email subject is required' });
    }

    // Find the template
    const template = await Template.findOne({ _id: id, userId });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Generate HTML from template blocks
    const htmlContent = generateEmailHTML(template.blocks);

    // Validate email configuration
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(500).json({ 
        message: 'Email configuration is incomplete. Please check your .env file.' 
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Email Builder" <no-reply@example.com>',
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log('Email sent:', info.messageId);

    res.json({
      message: 'Email sent successfully',
      messageId: info.messageId,
      recipient: recipientEmail
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle specific nodemailer errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        message: 'Email authentication failed. Please check your email credentials in .env file' 
      });
    }
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ 
        message: 'Email connection failed. Please check your email host and port settings.' 
      });
    }
    
    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({ 
        message: 'Email host not found. Please check your email host settings.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error sending email',
      error: error.message 
    });
  }
};