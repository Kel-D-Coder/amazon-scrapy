const Subscription = require("../models/subscription.model.js");
const { sendWelcomeMesssage } = require('../utils/notification.js')

// test with frontend

const StripeWebHook = async (req, res) => {
    const event = req.body

    const session = event.data.object;
  
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': 

            const userSub = await Subscription.findOneAndUpdate({ userId: req.userId }, {
                $set: {
                    customerId: session.customer,
                    paid: true
                }
            }, { new: true })

            sendWelcomeMesssage('okolokelvin02@gmail.com');
        break;
        
        case 'invoice.payment_failed':
            await Subscription.findOneAndUpdate({ userId: req.userId }, {
                $set: {
                    customerId: null,
                    paid: false
                }
            }, { new: true })

        break
        
        case 'customer.subscription.deleted':
            await Subscription.findOneAndUpdate({ userId: req.userId }, {
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