const { getBrowser, closeBrowser, takeScreenshot } = require(`./lib/puppets`);
async function test() {
  const browser = await getBrowser();
  const pagePuppet = await browser.newPage();
  // await require(`./tests/existence`)(pagePuppet);
  // await require(`./tests/content`)(pagePuppet);
  // await require(`./tests/interaction`)(pagePuppet);
  // await require( `./tests/emulation` )( pagePuppet );
  await require(`./tests/validity`)(pagePuppet);
  await takeScreenshot(pagePuppet);
  await closeBrowser(browser);
}
test();
