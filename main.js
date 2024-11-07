import { checkContent } from "./1-exists/content.js";
import { checkExistence } from "./1-exists/existence.js";
import { closeBrowser, getBrowser, takeScreenshot } from "./lib/puppets.js";
import testApi from "./tests/api.js";
import interaction from "./tests/interaction.js";
import speed from "./tests/speed.js";
import emulation from "./tests/emulation.js";
import validity from "./tests/validity.js";

async function test() {
  const { browser, pagePuppet } = await arrangeBefore();
  await checkExistence(pagePuppet);
  await checkContent(pagePuppet);
  await interaction(pagePuppet);
  await emulation(pagePuppet);
  await validity(pagePuppet);
  await takeScreenshot(pagePuppet);
  await cleanAfter(browser);
  await speed(); 
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
