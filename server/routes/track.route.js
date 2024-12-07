const express = require('express');
const { track } = require('../controller/track.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/', authMiddleware, track);

module.exports = router