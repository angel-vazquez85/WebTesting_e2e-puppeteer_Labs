const { getBrowser, closeBrowser, takeScreenshot } = require(`./lib/puppets`);
const testExistence = require(`./tests/existence`);
const testContent = require(`./tests/content`);
const testInteraction = require(`./tests/interaction`);
const testEmulation = require(`./tests/emulation`);
const testValidity = require(`./tests/validity`);
const testSpeed = require(`./tests/speed`);
const testApi = require(`./tests/api`);

async function test() {
  const { browser, pagePuppet } = await arrangeBefore();
  await testExistence(pagePuppet);
  await testContent(pagePuppet);
  await testInteraction(pagePuppet);
  await testEmulation(pagePuppet);
  await testValidity(pagePuppet);
  await takeScreenshot(pagePuppet);
  await cleanAfter(browser);
  await testSpeed();
  await testApi();
}
async function arrangeBefore() {
  const browser = await getBrowser();
  const pagePuppet = await browser.newPage();
  return { browser, pagePuppet };
}
async function cleanAfter(browser) {
  await closeBrowser(browser);
}

test();
