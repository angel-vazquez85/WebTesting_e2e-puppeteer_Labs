const puppeteer = require('puppeteer');
const itShouldExist = require('./tests/existence');
const { itShouldHaveTitle, itShouldHavePropperContentLength } = require('./tests/content');
const itShouldAllowSubscribe = require('./tests/interaction');

async function start() {
  const { browser, pagePuppet } = await arrangeBrowser();
  let numErrors = 0;
  numErrors += await itShouldExist(pagePuppet);
  numErrors += await itShouldHaveTitle(pagePuppet);
  numErrors += await itShouldHavePropperContentLength(pagePuppet);
  numErrors += await itShouldAllowSubscribe(pagePuppet);
  await afterAll(browser, numErrors);
}

async function arrangeBrowser() {
  console.info(`arranging browser `);
  const browser = await puppeteer.launch({
    headless: true
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
