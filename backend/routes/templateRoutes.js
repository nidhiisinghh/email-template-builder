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

router.post('/', auth, createTemplate);

router.get('/', auth, getUserTemplates);

router.get('/:id', auth, getTemplateById);

router.put('/:id', auth, updateTemplate);

router.delete('/:id', auth, deleteTemplate);

router.post('/:id/send', auth, sendTemplateEmail);

module.exports = router;