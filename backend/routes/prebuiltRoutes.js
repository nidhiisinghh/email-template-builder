const express = require('express');
const { 
  getPrebuiltTemplates,
  getPrebuiltTemplateById
} = require('../controllers/prebuiltController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getPrebuiltTemplates);

router.get('/:id', auth, getPrebuiltTemplateById);

module.exports = router;