import { closeBrowser, getBrowser } from "./lib/puppets.js";
import testApi from "./tests/api.js";

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
