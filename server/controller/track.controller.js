const http = require("http-status-codes");
const Product = require('../models/product.model.js');
const User = require("../models/user.model.js");
const ScrapeProduct = require("../utils/scrape.js");

// ✅✅✅✅
const track = async (req, res) => {
    try {
        const { url } = req.body
        const user = await User.findById(req.userId);

        const productData = await ScrapeProduct(url);

        if (productData && productData.name && productData.price) {
    
            // creating new entry
            const product = new Product({
                name: productData.name,
                url,
                currentPrice: productData.price,
                priceHistory: [{ price: productData.price }],
                imageUrl: productData.productImage,
            })

            product.emails.push(user.email);

            await product.save();
            
            return res.status(http.StatusCodes.OK).json({ msg: "Your product is successfully being tracked 🤖" });
        } else {
            res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Product data not found or incomplete" });     
        }    

    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occurred" });
        console.log(error.message)
    }
}


module.exports = { track }
