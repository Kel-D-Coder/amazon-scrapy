const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    trackedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],

    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        default: null
    }

}, { timestamps: true});


module.exports = mongoose.model("User", userSchema);
