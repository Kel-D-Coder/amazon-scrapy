const http = require("http-status-codes");
const Product = require('../models/product.model.js');
const User = require("../models/user.model.js");
const ScrapeProduct = require("../utils/scrape.js");

// ✅✅✅✅
const trackProduct = async (req, res) => {
    try {
        const { price, name, image, url } = req.body
        const userTrackedItem = await User.findById(req.userId);

        if (name && price && url) {
            const checkedProduct = await Product.findOne({ name, url })

            if (checkedProduct && userTrackedItem.trackedProducts.includes(checkedProduct._id)) {
                return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "This product is already being tracked" });
            }
            // creating new entry
            const product = await Product.create({
                name,
                url,
                currentPrice: price,
                imageUrl: image,
                priceHistory: [{ price }],
            })

            const user = await User.findByIdAndUpdate(req.userId, {
                $addToSet: {
                    trackedProducts: product._id
                }
            });

            return res.status(http.StatusCodes.OK).json({ msg: "Your product is successfully being tracked 🤖" });
        } else {
            return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Link invalid" });
        }    

    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occurred please try again later" });
        console.log(error)
    }
}

const getProduct = async (req, res) => {
    try {
        const { url } = req.body;

        const productData = await ScrapeProduct(url);

        if (!productData) { 
            return new Error("No product data returned");
        } 

        if (productData && productData.name && productData.price && productData.productImage) {
            return res.status(http.StatusCodes.OK).json({msg: "Product found", productData});
        } else {
            console.log(productData)
            return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Product data not found. Try again" });
        }

        
    } catch (error) {
        console.log(error)
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occurred please try again later" });
    }
}

const getTrackedProduct = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("trackedProducts").exec();

        return res.status(http.StatusCodes.OK).json(user.trackedProducts);
    } catch (error) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occurred" });
    }
}


const unTrack = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { trackedProducts: req.body.productId } },
            { new: true } // Return the updated document
        ).populate('trackedProducts').exec();

        if (!user) {
            return res.status(http.StatusCodes.NOT_FOUND).json({ msg: "User not found" });
        }

        return res.status(http.StatusCodes.OK).json({ msg: "Product untracked successfully", trackedProducts: user.trackedProducts });
    } catch (error) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occurred" });
    }
}

module.exports = { trackProduct, getProduct, getTrackedProduct, unTrack }
