// models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    customerId: {
        type: String,
        default: null
    },

    subscribedAt: {
        type: Date,
        default: Date.now()
    },

    paid: {
        type: Boolean,
        default: false
    },

    subscriptionType: {
        type: String
    }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);