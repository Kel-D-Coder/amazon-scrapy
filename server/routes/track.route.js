const express = require('express');
const { trackProduct, getProduct, getTrackedProduct, unTrack } = require('../controller/track.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const subscriptionMiddleware = require("../middleware/payment.middleware.js")

const router = express.Router();

router.post('/get-product', getProduct);
router.post('/', authMiddleware, subscriptionMiddleware, trackProduct);
router.get('/get-tracked', authMiddleware, getTrackedProduct);
router.post('/untrack', authMiddleware, unTrack)

module.exports = router