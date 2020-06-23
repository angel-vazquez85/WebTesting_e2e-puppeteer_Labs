const path = require('path');
const puppeteer = require(`puppeteer`);
let browser;
exports.getBrowser = async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      devtools: false
    });
  }
  return browser;
};

exports.closeBrowser = async function close(browser) {
  await browser.close();
};

exports.takeScreenshot = async function takeScreenshot(pagePuppet) {
  const timeStamp = new Date().getTime();
  const shotPath = path.join(process.cwd(), 'images', `${timeStamp}.png`);
  await pagePuppet.screenshot({
    path: shotPath,
    fullPage: false
  });
};

/*


  // Grants permission for changing geolocation
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://pptr.dev', ['geolocation']);
    // Changes to the north pole's location
  await page.setGeolocation({ latitude: 90, longitude: 0 });

  // Explorer
  https://tech-query.me/Puppeteer-IE/
*/
