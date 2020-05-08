const puppeteer = require('puppeteer');
const itShouldExist = require('./tests/existence');
const { itShouldHaveTitle, itShouldHavePropperContentLength } = require('./tests/content');
const itShouldAllowSubscribe = require('./tests/interaction');
const takeScreenshot = require('./lib/screenshots');
const itShouldBeFast = require('./tests/speed');

async function start() {
  const { browser, pagePuppet } = await arrangeBrowser();
  let numErrors = 0;
  numErrors += await itShouldExist(pagePuppet);
  numErrors += await takeScreenshot(pagePuppet);
  numErrors += await itShouldHaveTitle(pagePuppet);
  numErrors += await itShouldHavePropperContentLength(pagePuppet);
  numErrors += await itShouldAllowSubscribe(pagePuppet);
  numErrors += await takeScreenshot(pagePuppet);
  numErrors += await itShouldBeFast();
  await afterAll(browser, numErrors);
}

async function arrangeBrowser() {
  console.info(`arranging browser `);
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 }
  });
  const pagePuppet = await browser.newPage();
  return { browser, pagePuppet };
}

async function afterAll(browser, numErrors) {
  await browser.close();
  if (numErrors) {
    console.warn(`🔴 FAIL: there are ${numErrors} site errors`);
  } else {
    console.info('🟩 SUCCESS: all tests completed successfully');
  }
  process.exit(numErrors);
}

start();
