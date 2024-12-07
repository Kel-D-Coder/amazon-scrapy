const stripe = require("stripe")(process.env.STRIPE_SECRET);
const http = require("http-status-codes");

// ✅✅✅✅
const CustomerPortal = async (req, res) => {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: req.query.customer,
            return_url: 'http://localhost:3000/'
        })

        res.status(http.StatusCodes.OK).json({ portalUrl: portalSession.url});
    } catch (error) {
        return res.status(http.StatusCodes.BAD_REQUEST).send();
    }
}

module.exports = { CustomerPortal }