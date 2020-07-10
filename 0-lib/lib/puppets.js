// const path = require(`path`);

const puppeteer = require(`puppeteer`);

let browser = null;
exports.getBrowser = async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 768, height: 1024 },
      devtools: false
    });
  }
  return browser;
};

exports.closeBrowser = async function close(browser) {
  await browser.close();
};

// exports.takeScreenshot = async function takeScreenshot(pagePuppet) {
//   const timeStamp = new Date().getTime();
//   const shotPath = path.join(process.cwd(), 'images', `${timeStamp}.png`);
//   await pagePuppet.screenshot({
//     path: shotPath,
//     fullPage: false
//   });
// };
