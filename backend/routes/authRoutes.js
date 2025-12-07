const express = require('express');
const { register, login, getProfile, getAllUsers, refreshToken } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refreshToken);

router.get('/profile', auth, getProfile);

router.get('/users', auth, getAllUsers);

module.exports = router;