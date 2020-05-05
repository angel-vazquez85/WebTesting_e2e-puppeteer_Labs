const puppeteer = require('puppeteer');
const assert = require('assert').strict;

async function start() {
  let numErrors = 0;
  const inputPageUrl = 'https://www.bitademy.com';
  const { browser, pagePuppet } = await arrangeBrowserAndPage(inputPageUrl);
  numErrors += await itShouldHaveTitle(pagePuppet);
  numErrors += await itShouldHavePropperContentLength(pagePuppet);
  await afterAll(browser, numErrors);
}

async function arrangeBrowserAndPage(pageUrl) {
  console.info(`arranging browser for visiting page: ${pageUrl}`);
  const browser = await puppeteer.launch({
    headless: true
  });
  const pagePuppet = await browser.newPage();
  await pagePuppet.goto(pageUrl, { waitUntil: 'networkidle2' });
  console.info(`visited ${pageUrl}`);
  return { browser, pagePuppet };
}

async function itShouldHaveTitle(pagePuppet) {
  const expected = 'bitAdemy';
  console.info(`it Should Have Title: ${expected}`);
  const actual = await actGetTitle(pagePuppet);
  return assertEqual(actual, expected);
}

async function actGetTitle(pagePuppet) {
  return await pagePuppet.title();
}

async function itShouldHavePropperContentLength(pagePuppet) {
  const kiloByte = 1024;
  const maximunExpected = kiloByte * 30;
  console.info(`it Should Have Propper Content Length less than: ${maximunExpected}`);
  const actual = await actGetContentLength(pagePuppet);
  const failMessage = `Actual Size ${actual} is bigger than maximun expected ${maximunExpected}`;
  return assertTrue(actual < maximunExpected, failMessage);
}

async function actGetContentLength(pagePuppet) {
  const content = await pagePuppet.content();
  return content.length;
}

function assertEqual(actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    return 0;
  } catch (error) {
    console.warn({ error });
    return 1;
  }
}

function assertTrue(actual, failMessage) {
  try {
    assert.ok(actual, failMessage);
    return 0;
  } catch (error) {
    console.warn({ error });
    return 1;
  }
}

async function afterAll(browser, numErrors) {
  await browser.close();
  if (numErrors) {
    console.warn(`there are ${numErrors} site errors`);
  } else {
    console.info('test completed successfully');
  }
  process.exit(numErrors);
}

start();
