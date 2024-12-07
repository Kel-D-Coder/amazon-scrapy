const cron = require("node-cron");
const Product = require("../models/product.model.js");
const ScrapePrice = require("./scrape.js");
const Subscription = require('../models/subscription.model.js');
const {sendNotification} = require("../utils/notification.js");

// remember to test this function;
const Schedule = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log("checking price .....");
    
        const products = await Product.find();
    
        for (const product of products) {
            
            try {
                // Scrape the latest price for each product
                const productData = await ScrapePrice(product.url);

                if (productData.price < product.currentPrice) {
                    //Update price and price history
                    const oldPrice = product.currentPrice;

                    product.currentPrice = productData.price;

                    product.priceHistory.push({ price: productData.price, date: new Date() });
                    await product.save();

                    console.log(`Price drop detected for ${product.name}: from $${oldPrice} to $${productData.price}`);

                    // Send email
                    product.emails.forEach(email => {

                        sendNotification(email, {
                            productName: product.name,
                            oldPrice,
                            newPrice: productData.price,
                            productImageUrl: product.imageUrl,
                            url: product.url
                        });
                    })

                    continue
                        
                } else {
                    console.log("No price drop")
                }
            } catch (error) {
                console.log(error.message)
                console.error(`Failed to scrape`);
            }
        }
    })
}

module.exports = {
    Schedule
}