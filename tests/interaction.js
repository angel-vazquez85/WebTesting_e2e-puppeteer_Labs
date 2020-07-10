const { given, when, then } = require(`../lib/bit.tester`);

module.exports = async function (pagePuppet) {
  await given(`A term to find on google`, async () => {
    const inputPageUrl = `https://www.google.com`;
    const inputTerm = `bitAdemy`;
    await pagePuppet.goto(inputPageUrl, { waitUntil: `networkidle2` });
    await when(`we search ${inputTerm}`, async () => {
      await pagePuppet.focus('[name=q]');
      await pagePuppet.keyboard.type(inputTerm);
      await pagePuppet.keyboard.press('Enter');
      await pagePuppet.waitForNavigation();
      const actual = await pagePuppet.evaluate(() => window.find(`bitademy.com`));
      let expected = true;
      then(`the related site is found`, actual, expected);
    });
  });
};
