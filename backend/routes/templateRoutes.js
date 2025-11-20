const express = require('express');
const { 
  createTemplate,
  getUserTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  sendTemplateEmail
} = require('../controllers/templateController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new template
router.post('/', auth, createTemplate);

// Get all templates for a user
router.get('/', auth, getUserTemplates);

// Get a specific template by ID
router.get('/:id', auth, getTemplateById);

// Update a template
router.put('/:id', auth, updateTemplate);

// Delete a template
router.delete('/:id', auth, deleteTemplate);

// Send template as email
router.post('/:id/send', auth, sendTemplateEmail);

module.exports = router;