const express = require("express");
const authMiddleware = require('../middleware/auth.middleware.js');
const { PayForPlan } = require('../controller/payment.controller.js');
const { CustomerPortal } = require("../controller/portal.controller.js");

const router = express.Router();

router.get('/', PayForPlan);
router.get('/customer/portal', authMiddleware, CustomerPortal);


module.exports = router;