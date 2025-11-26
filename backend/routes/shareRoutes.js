const express = require('express');
const { 
  shareTemplate,
  getSharedTemplates,
  respondToShare,
  getPendingShares
} = require('../controllers/shareController');
const auth = require('../middleware/auth');

const router = express.Router();

// Share a template with another user
router.post('/templates/:templateId/share', auth, shareTemplate);

// Get all shared templates (both shared by user and shared with user)
router.get('/templates/shared', auth, getSharedTemplates);

// Respond to a share request (accept/reject)
router.put('/templates/:templateId/respond', auth, respondToShare);

// Get pending share requests
router.get('/templates/shared/pending', auth, getPendingShares);

module.exports = router;