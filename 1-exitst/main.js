const { getBrowser, closeBrowser } = require(`./lib/puppets`);

async function test() {
  const browser = await getBrowser();
  const pagePuppet = await browser.newPage();
  await testExistence(pagePuppet);
  await closeBrowser(browser);
}
test();

// const { getBrowser, closeBrowser, takeScreenshot } = require(`./lib/puppets`);
// await takeScreenshot(pagePuppet);
