const assertEqual = require('../lib/assert');
const assertTrue = require('../lib/assert');
module.exports = async function itShouldHaveTitle(pagePuppet) {
  const expected = 'bitAdemy';
  console.info(`it Should Have Title: ${expected}`);
  const actual = await actGetTitle(pagePuppet);
  return assertEqual(actual, expected);
};

module.exports = async function itShouldHavePropperContentLength(pagePuppet) {
  const kiloByte = 1024;
  const maximunExpected = kiloByte * 30;
  console.info(`it Should Have Propper Content Length less than: ${maximunExpected}`);
  const actual = await actGetContentLength(pagePuppet);
  const failMessage = `Actual Size ${actual} is bigger than maximun expected ${maximunExpected}`;
  return assertTrue(actual < maximunExpected, failMessage);
};

async function actGetTitle(pagePuppet) {
  return await pagePuppet.title();
}
async function actGetContentLength(pagePuppet) {
  const content = await pagePuppet.content();
  return content.length;
}
