const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Subscription = require('../models/subscription.model.js');
const User = require('../models/user.model.js');
const http = require('http-status-codes');

// full test with frontend
const PayForPlan = async (req, res) => {
    const plan = req.query.plan
    const userId = req.userId

   try {
       const user = await User.findById(userId);
       const sub = await Subscription.findOne(userId);

        if (!plan) {
            return res.send("Subscription plan not found");
        }

        let priceId;

        switch (plan.toLocaleLowerCase()) {
            case 'starter':
                priceId = 'price_1QKbqQP5uge0MF4ZDxakqUHs'
                break
            case 'pro':
                priceId = 'price_1QKbx8P5uge0MF4ZhzMD66HJ'
                break
            default:
                return res.send("Subscription plan not found");
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],

            // Remember to make this to match the pages in the react app
            success_url: 'http://localhost:3000/api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel'
        })
       
        if (!sub) {
           await Subscription.create({
               userId,
               email: user.email,
               subscriptionType: plan
            })
        }

       return res.status(http.StatusCodes.OK).json({ sessionUrl: session.url });

    } catch (error) {
       return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error occurred while processing subscription payment' });
    }
}

module.exports = {
    PayForPlan,
}