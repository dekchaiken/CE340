const puppeteer = require('puppeteer');
const URL = 'http://localhost:3000';
const PERIOD = 20000;

const main = async () => {
    const browser = await puppeteer.launch({    // สร้าง browser ขึ้นมา
        headless: false,
        channel: 'chrome',
    });
    const page = await browser.newPage();

    // Navigate to the page to a url
    await page.goto(URL);
    await page.screenshot({ path: 'example.png' });
    // Click on the Basic Math link
    const bLink = await page.waitForSelector("#basicmath");  // ที่มาของ id คือจากไฟล์ index.html
    await bLink.click();

    // Handle event of popup (Alert dialog)
    page.on('dialog', async dialog => {
        await delay(1000);
        const message = dialog.message();
        if (message == input1 + " + " + input2 + " = " + (input1 + input2)) {
            console.log("Message is correct");
        } else if (message == input1 + " - " + input2 + " = " + (input1 - input2)) {
            console.log("Message is correct");
        } else if (message == input1 + " * " + input2 + " = " + (input1 * input2)) {
            console.log("Message is correct");
        } else if (message == input1 + " / " + input2 + " = " + (input1 / input2)) {
            console.log("Message is correct");
        } else {
            console.log("Message is incorrect");
        }
        console.log(dialog.message());
        await dialog.dismiss();
    });

    const input1 = 2, input2 = 2, input3 = 2;

    const paramAdd1 = await page.waitForSelector("#add_param1");
    await paramAdd1.focus();
    await page.keyboard.type(input1.toString());
    const paramAdd2 = await page.waitForSelector("#add_param2");
    await paramAdd2.focus();
    await page.keyboard.type(input2.toString());
    // Click add button
    await page.waitForSelector("#add");
    await page.click("#add");
    await delay(1000);

    // Clear the input fields
    await paramAdd1.focus();
    await page.keyboard.press('Backspace');
    await paramAdd2.focus();
    await page.keyboard.press('Backspace');
    const paramSub1 = await page.waitForSelector("#add_param1");
    await paramSub1.focus();
    await page.keyboard.type(input1.toString());
    const paramSub2 = await page.waitForSelector("#add_param2");
    await paramSub2.focus();
    await page.keyboard.type(input2.toString());
    // Click subtract button
    await page.waitForSelector("#subtract");
    await page.click("#subtract");
    await delay(1000);

    await paramAdd1.focus();
    await page.keyboard.press('Backspace');
    await paramAdd2.focus();
    await page.keyboard.press('Backspace');
    const paramMul1 = await page.waitForSelector("#add_param1");
    await paramMul1.focus();
    await page.keyboard.type(input1.toString());
    const paramMul2 = await page.waitForSelector("#add_param2");
    await paramMul2.focus();
    await page.keyboard.type(input2.toString());
    // Click multiply button
    await page.waitForSelector("#multiply");
    await page.click("#multiply");
    await delay(1000);

    await paramAdd1.focus();
    await page.keyboard.press('Backspace');
    await paramAdd2.focus();
    await page.keyboard.press('Backspace');
    const paramDiv1 = await page.waitForSelector("#add_param1");
    await paramDiv1.focus();
    await page.keyboard.type(input1.toString());
    const paramDiv2 = await page.waitForSelector("#add_param2");
    await paramDiv2.focus();
    await page.keyboard.type(input2.toString());
    // Click divide button
    await page.waitForSelector("#divide");
    await page.click("#divide");
    await delay(1000);

    // Sum of 3 numbers
    const paramSum1 = await page.waitForSelector("#add_param1");
    await paramSum1.focus();
    await page.keyboard.press('Backspace');
    await paramSum1.focus();
    await page.keyboard.type(input1.toString());

    const paramSum2 = await page.waitForSelector("#add_param2");
    await paramSum2.focus();
    await page.keyboard.press('Backspace');
    await paramSum2.focus();
    await page.keyboard.type(input2.toString());
    
    const paramSum3 = await page.waitForSelector("#add_param3");
    await paramSum3.focus();
    await page.keyboard.press('Backspace');
    await paramSum3.focus();
    await page.keyboard.type(input3.toString());
    // Click sum button
    await page.waitForSelector("#sum");
    await page.click("#sum");
    await delay(1000);

    // Average of 3 numbers
    const paramAvg1 = await page.waitForSelector("#add_param1");
    await paramAvg1.focus();
    await page.keyboard.press('Backspace');
    await paramAvg1.focus();
    await page.keyboard.type(input1.toString());

    const paramAvg2 = await page.waitForSelector("#add_param2");
    await paramAvg2.focus();
    await page.keyboard.press('Backspace');
    await paramAvg2.focus();
    await page.keyboard.type(input2.toString());

    const paramAvg3 = await page.waitForSelector("#add_param3");
    await paramAvg3.focus();
    await page.keyboard.press('Backspace');
    await paramAvg3.focus();
    await page.keyboard.type(input3.toString());

    // Click average button
    await page.waitForSelector("#average");
    await page.click("#average");
    await delay(1000);

    await delay(PERIOD);
    await browser.close();
}

const delay = msecs => {
    return new Promise(resolve => {
        setTimeout(resolve, msecs);
    });
}

main();