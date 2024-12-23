const Subscription = require("../models/subscription.model.js");
const User = require("../models/user.model.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// test with frontend

const StripeWebHook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        // console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;

    const userId = session.metadata.userId;

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':

            const userSub = await Subscription.findOneAndUpdate({ userId }, {
                $set: {
                    customerId: session.customer,
                    paid: true
                }
            }, { new: true })

            console.log("Session completed");

            // sendWelcomeMesssage(userSub.email);
        break;


        case 'invoice.payment_failed':
            await Subscription.findOneAndUpdate({ userId }, {
                $set: {
                    customerId: null,
                    paid: false
                }
            }, { new: true })

            User.findByIdAndUpdate(userId, {
                $set: {
                    Subscription: {}
                }
            })
        break


        case 'customer.subscription.deleted':
            await Subscription.findOneAndUpdate({ userId }, {
                $set: {
                    customerId: null,
                    paid: false
                }
            }, { new: true })
        break
    
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
}

module.exports = {
    StripeWebHook
}