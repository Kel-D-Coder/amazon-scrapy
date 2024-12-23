const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    url: String,
    currentPrice: Number,

    priceHistory: [{
        price: Number,
        date: { type: Date, default: Date.now() }
    }],

    imageUrl: String,
})

module.exports = mongoose.model("Product", ProductSchema);