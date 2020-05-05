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
  const actual = await actGetTitle(pagePuppet);
  const expected = 'bitAdemy';
  return assertEqual(actual, expected);
}

async function actGetTitle(pagePuppet) {
  return await pagePuppet.title();
}

async function itShouldHavePropperContentLength(pagePuppet) {
  const actual = await actGetContentLength(pagePuppet);
  const kiloByte = 1024;
  const maximunExpected = kiloByte * 30;
  const message = `Actual Size ${actual} is bigger than maximun expected ${maximunExpected}`;
  return assertTrue(actual < maximunExpected, message);
}

async function actGetContentLength(pagePuppet) {
  const content = await pagePuppet.content();
  return content.length;
}

function assertEqual(actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    return 0;
  } catch (err) {
    console.warn({ err });
    return 1;
  }
}

function assertTrue(actual, expected, message) {
  try {
    assert(actual, expected, message);
    return 0;
  } catch (err) {
    console.warn({ err });
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
