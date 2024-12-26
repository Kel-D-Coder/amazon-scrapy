const stripe = require("stripe")(process.env.STRIPE_SECRET);
const http = require("http-status-codes");
const User = require("../models/user.model.js");

// ✅✅✅✅
const CustomerPortal = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("subscription");

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.subscription.customerId,
            return_url: 'http://localhost:3000/'
        })

        res.status(http.StatusCodes.OK).json({ portalUrl: portalSession.url});
    } catch (error) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

module.exports = { CustomerPortal }