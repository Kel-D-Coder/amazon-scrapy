const express = require("express");
const { StripeWebHook } = require('../controller/webhook.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router()

router.post('/', authMiddleware, express.raw({ type: 'application/json' }), StripeWebHook);

module.exports = router;