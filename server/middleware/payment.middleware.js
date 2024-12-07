const Subscription = require('../models/subscription.model.js');
const http = require('http-status-codes');

const subscriptionMiddleware = async (req, res, next) => {
    try {
        const userSubscription = await Subscription.findById(req.userId);
        if (userSubscription.paid) {
            next();
        } else {
            return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Please subscribe to a plan" });
        }

    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occured" });
    }
}

model.exports = subscriptionMiddleware