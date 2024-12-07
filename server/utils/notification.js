const nodemailer = require('nodemailer');

// ✅✅✅✅
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'okolochibundu887@gmail.com',
    pass: 'qboj iyxq cydw qnct'
  }
});

const sendNotification = async (recipientEmail, { productName, oldPrice, newPrice, url, productImageUrl }) => {
    try {
        const mailOptions = {
            from: 'Amazon Scrapy <okolochibundu887@gmail.com>',
            to: recipientEmail,
            subject: `Price drop alert for ${productName}`,
            text: `Attention!!! The price of ${productName} has dropped from $${oldPrice} to $${newPrice}. \n\ Check it out here: ${url}`,
            html: `
                <h2>Price drop alert for ${productName}!</h2>
                <img src="${productImageUrl}" alt="${productName}" width="200" />
                <p>The price has dropped from <strong> $${oldPrice} </strong> to <strong> $${newPrice} </strong>. </p>
                <p><a href="${url}">View Product</a></p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`Notification sent to ${recipientEmail}`);
    } catch (error) {
        console.error(`Failed to send notification to ${recipientEmail}:`, error.message)
    }
}

const sendWelcomeMesssage = async (userEmail) => {
    try {

        // Email content
        const mailOptions = {
            from: 'Amazon Scrapy <okolochibundu887@gmail.com>', // Sender address
            to: userEmail, // List of receivers
            subject: 'Welcome to Your Amazon scrapy!',
            html: `
                <h1>Hi User,</h1>
                <p>Welcome to <b>Amazon Scrapy</b>! 🎉 We're thrilled to have you with us.</p>
                <p>Here's what you can do with our service:</p>
                <ul>
                    <li>Start tracking your favorite products.</li>
                    <li>Receive price drop alerts instantly.</li>
                    <li>Save money and never miss a deal!</li>
                </ul>
                <p>Cheers,</p>
                <p><b>The Amazon Scrapy Team</b></p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:');
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }

}

// sendWelcomeMesssage('okolokelvin02@gmail.com');

// sendNotification('okolokelvin02@gmail.com', {
//     productName: "Samsung Galaxy A15 A155M 128GB Dual-SIM GSM Unlocked Android Smartphone (Latin America Version) - Blue Black",
//     oldPrice: 149.98,
//     newPrice: 120.99,
//     url: "https://www.amazon.com/Samsung-SM-155M-DSN-Unlocked-International/dp/B0CSB14R7J/?_encoding=UTF8&pd_rd_w=ZqPSl&content-id=amzn1.sym.4b90c80a-3aee-44a3-b41d-fc2674a3ef63%3Aamzn1.symc.ee4c414f-039b-458d-a009-4479557ca47b&pf_rd_p=4b90c80a-3aee-44a3-b41d-fc2674a3ef63&pf_rd_r=YCQFZJ6WAS71Z37EPZQM&pd_rd_wg=dhFoS&pd_rd_r=a5739199-b7c9-419f-8a40-c3c0ce5bf70d&ref_=pd_hp_d_btf_ci_mcx_mr_hp_d&th=1",
//     productImageUrl: "https://m.media-amazon.com/images/I/515zGEaozeL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
// })

module.exports = { sendNotification, sendWelcomeMesssage }