const express = require('express');
const router = express.Router();
const { register, login, signWithGoogle } = require('../controller/auth.controller.js');

router.post('/login', login);
router.post('/register', register);
router.post('/signWithGoogle', signWithGoogle)

module.exports = router