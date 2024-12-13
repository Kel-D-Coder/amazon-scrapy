const puppeteer = require("puppeteer");

//  ✅✅✅✅
const ScrapeProductPrice = async (url) => {
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();

    // Set viewport to a desktop resolution to ensure a desktop layout
    await page.setViewport({ width: 1280, height: 840 });

    await page.goto(url, {waitUntil: "domcontentloaded"});

    const productData = await page.evaluate(() => {
        const getText = (selector) => document.querySelector(selector)?.textContent?.replace('$', '').trim() || null
        const getImageUrl = (selector) => document.querySelector(selector)?.src || null
        const price = getText('.a-section.a-spacing-none.aok-align-center.aok-relative .aok-offscreen').split(" ")[0] || getText(".a-offscreen");
        const productName = getText("#title #productTitle")
        const productImage = getImageUrl('#imgTagWrapperId img');

        return { name: productName, price, productImage }
    })

    await browser.close();

    console.log(productData);

    return productData;
}

// ScrapeProductPrice("https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=UDH9l&content-id=amzn1.sym.9929d3ab-edb7-4ef5-a232-26d90f828fa5&pf_rd_p=9929d3ab-edb7-4ef5-a232-26d90f828fa5&pf_rd_r=RBT9C8ZH6Q3F5558B2C6&pd_rd_wg=wFnDk&pd_rd_r=52bdc82b-2098-45ca-8db1-e0d586f13903&ref_=pd_hp_d_btf_crs_zg_bs_3375251&th=1");

module.exports = ScrapeProductPrice;