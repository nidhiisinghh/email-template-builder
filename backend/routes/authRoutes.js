const express = require('express');
const { register, login, getProfile, getAllUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', auth, getProfile);

// New route for getting all users (for sharing dropdown)
router.get('/users', auth, getAllUsers);

module.exports = router;