const puppeteer = require('puppeteer');
const fs = require('fs');
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://kyou.id/search?keyword=PVC%20Figure");
            await page.waitForSelector('body');
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

            let urls = await page.evaluate(() => {
                let results = [];
                $('.product-thumbnail__img').each(function(){
                  let title = $(this).find('a').attr('title');
                  let img = $(this).find('img').attr('src')
                  results.push({
                    title: title,
                    img: img
                  })
                })
                return results;
            })
            await browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);
