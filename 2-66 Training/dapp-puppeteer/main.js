const puppeteer = require('puppeteer');

const PERIOD = 2000;

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the page to a url
    await page.goto('https://www.dpu.ac.th/');
    await delay(PERIOD);
    await browser.close();
}

const delay = msecs => {
    return new Promise(resolve => {
        setTimeout(resolve, msecs);
    });
}

main();