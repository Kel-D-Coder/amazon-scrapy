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

    paid: {
        type: Boolean,
        default: false
    },

    subscriptionType: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model('Subscription', subscriptionSchema);