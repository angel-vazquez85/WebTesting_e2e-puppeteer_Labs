import { closeBrowser, getBrowser, takeScreenshot } from './lib/puppets.js';

async function test() {
  const browser = await getBrowser();
  const pagePuppet = await browser.newPage();
  await pagePuppet.goto(`https://www.bitademy.com`, { waitUntil: `load` });
  await takeScreenshot(pagePuppet);
  await closeBrowser(browser);
}
test();

// const { getBrowser, closeBrowser, takeScreenshot } = require(`./lib/puppets`);
// await takeScreenshot(pagePuppet);
