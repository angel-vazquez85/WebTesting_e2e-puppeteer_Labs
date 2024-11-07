import { getBrowser, closeBrowser } from "../lib/puppets.js";
import { checkExistence } from "./existence.js";


async function test() {
  const browser = await getBrowser();
  const pagePuppet = await browser.newPage();
  await checkExistence(pagePuppet);
  await closeBrowser(browser);
}
test();

// const { getBrowser, closeBrowser, takeScreenshot } = require(`./lib/puppets`);
// await takeScreenshot(pagePuppet);
