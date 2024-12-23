// const Subscription = require('../models/subscription.model.js');
const http = require('http-status-codes');
const User = require('../models/user.model');

const subscriptionMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate('subscription').exec();
        if (user.subscription.paid) {
            next();
        }

    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occured", subUrl: '/pricing'});
    }
}

module.exports = subscriptionMiddleware