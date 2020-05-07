const { assertEqual, assertTrue } = require('../lib/assert');

async function itShouldHaveTitle(pagePuppet) {
  console.info(`GIVEN a page`);
  const expected = 'bitAdemy';
  console.info(`  WHEN we get its title`);
  const actual = await actGetTitle(pagePuppet);
  console.info(`    THEN it Should Have Title: ${expected}`);
  return assertEqual(actual, expected);
}

async function itShouldHavePropperContentLength(pagePuppet) {
  const kiloByte = 1024;
  const maximunExpected = kiloByte * 30;
  console.info(`GIVEN a page and a limit of ${maximunExpected} bytes`);
  console.info(`  WHEN we get its content lenght`);
  const actual = await actGetContentLength(pagePuppet);
  console.info(`    THEN it Should Have Propper Content Length less than: ${maximunExpected}`);
  const failMessage = `     Actual Size ${actual} is bigger than maximun expected ${maximunExpected}`;
  return assertTrue(actual < maximunExpected, failMessage);
}

async function actGetTitle(pagePuppet) {
  return await pagePuppet.title();
}
async function actGetContentLength(pagePuppet) {
  const content = await pagePuppet.content();
  return content.length;
}

module.exports = {
  itShouldHaveTitle,
  itShouldHavePropperContentLength
};
