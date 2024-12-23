const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const randomUserAgent = require('random-useragent');


    const proxies = [
        'http://35.176.148.8:3128',
        'http://187.141.125.210:8080',
        'http://103.152.112.120:80'
    ]

    const getRandomProxy = (proxyList) => {
        const randomIndex = Math.floor(Math.random() * proxyList.length);
        return proxyList[randomIndex];
    };

// //  ✅✅✅✅
const ScrapeProductPrice = async (url) => {

    const proxy = getRandomProxy(proxies);

    try {
        const browser = await puppeteer.launch({
            args: [`--proxy-server=${proxy}`],
        });

        const page = await browser.newPage();

        // Set viewport to a desktop resolution to ensure a desktop layout
        await page.setViewport({ width: 1280, height: 840 });

        // set a random user agent
        await page.setUserAgent(randomUserAgent.getRandom());

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });

        await page.waitForSelector('.a-section.a-spacing-none .a-size-large.a-spacing-none .a-size-large.product-title-word-break');
        await page.waitForSelector(".imgTagWrapper img");


        const productData = await page.evaluate(() => {
            const getText = (selector) => document.querySelector(selector)?.textContent.trim() || null
            const getPrice = (selector) => document.querySelector(selector)?.textContent?.replace('$', '').replace(',', '').trim() || null
            const getImageUrl = (selector) => document.querySelector(selector)?.src || null

            const price = getPrice('.a-section.a-spacing-none.aok-align-center.aok-relative .aok-offscreen')?.split(" ")[0] || 'Unavailable'
            const productName = getText(".a-section.a-spacing-none .a-size-large.a-spacing-none .a-size-large.product-title-word-break")
            const productImage = getImageUrl('.imgTagWrapper img');

            return { name: productName, price, productImage }
        })

        await browser.close();

        console.log(productData);
        return productData;

    } catch (error) {
        console.error(`Error scraping product data:`, error.message);
        return null;
    }

}

ScrapeProductPrice("https://www.amazon.com/SAMSUNG-Physical-Smartphone-Factory-Unlocked/dp/B0CV73SG4Z/ref=sr_1_2?crid=1BSC6JCF03VUL&dib=eyJ2IjoiMSJ9.nsyb0SF4p0uSwFcc8N5ap1GxcWJN8kqXLVbuxcqbiI2-xQQQUVb8fdYSOsDExFtiWpPNGRMwVbbUdvgDFkt0BboghpoMr4qkEeelFcX27nq5y-7lZp0ABMNWF4zrVgniv1PNLOU1e7hSvG_DDQrrLHLCDndTJZTxoYQJQarcJWykQsGdlbQvpUEzWu5Yvyx4s2Z7bLgB-bH1pxY6hh3r3bIQ3oTnV5wkphXF3Lp6NyM.Rg8bWZ3sH3me4cbp63qlLGXg-vll06Cmm9S2aO49Oho&dib_tag=se&keywords=samsung+s24+ultra&qid=1734889551&sprefix=samsung+s%2Caps%2C519&sr=8-2");

module.exports = ScrapeProductPrice;