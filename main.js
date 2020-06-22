const { given, when, then, equals } = require(`./tests/bit.tester`);
const puppeteer = require(`puppeteer`);
const path = require('path');
let browser;
given(`A site url`, async () => {
  const browser = await arrangeBrowser();
  const pagePuppet = await browser.newPage();
  const inputPageUrl = `https://www.bitademy.com`;
  when(`we visit it`, async () => {
    const response = await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
    await takeScreenshot(pagePuppet);
    let assert = {
      fn: equals,
      actual: response.ok(),
      expected: true
    };
    then(`respond with an ok status code`, assert);
    assert.actual = await pagePuppet.title();
    assert.expected = `bitAdemy`;
    then(`have a correct title`, assert);
    await browser.close();
  });
});

// given(`A site url`, async () => {
//   const browser = await arrangeBrowser();
//   const pagePuppet = await browser.newPage();
//   const inputPageUrl = `https://www.bitademy.com`;
//   when(`we download content`, async () => {
//     await pagePuppet.goto(inputPageUrl, { waitUntil: `networkidle2` });
//     await takeScreenshot(pagePuppet);
//     const content = await pagePuppet.content();
//     const kiloByte = 1024;
//     const maximumKiloBytes = 30;
//     const maximunExpected = kiloByte * maximumKiloBytes;
//     let actual = content.length < maximunExpected;
//     let expected = true;
//     then(`content is smaller than ${maximunExpected} bytes`, actual, expected);
//     await browser.close();
//   });
// });

async function arrangeBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1920, height: 1080 }
    });
  }
  return browser;
}

async function takeScreenshot(pagePuppet) {
  const timeStamp = new Date().getTime();
  const shotPath = path.join(process.cwd(), 'images', `${timeStamp}.png`);
  await pagePuppet.screenshot({
    path: shotPath,
    fullPage: true
  });
}
