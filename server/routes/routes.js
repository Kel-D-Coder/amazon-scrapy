const express = require("express")
const router = express.Router();

const AuthRouter = require("./auth.route.js");
const SubscriptionRouter = require("./track.route.js");
const PaymentRouter = require("./payment.route.js");
const WebHookRoute = require('./webhook.route.js');
const TrackRoute = require('./track.route.js');

const base = '/api/v1'

router.use(`${base}/auth`, AuthRouter);
router.use(`${base}/payment`, PaymentRouter);
router.use(`${base}/track`, TrackRoute);
router.use(`${base}/subscribe`, SubscriptionRouter);
router.use(`${base}/webhooks`, WebHookRoute);

module.exports = router