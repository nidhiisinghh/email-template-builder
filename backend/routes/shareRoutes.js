const express = require('express');
const { 
  shareTemplate,
  getSharedTemplates,
  respondToShare,
  getPendingShares
} = require('../controllers/shareController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/templates/:templateId/share', auth, shareTemplate);

router.get('/templates/shared', auth, getSharedTemplates);

router.put('/templates/:templateId/respond', auth, respondToShare);

router.get('/templates/shared/pending', auth, getPendingShares);

module.exports = router;