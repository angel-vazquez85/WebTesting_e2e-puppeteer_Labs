const { given, when, then } = require(`../lib/bit.tester`);
module.exports = async function (pagePuppet) {
  const inputPageUrl = `https://www.bitademy.com/`;
  await given(`A the page at ${inputPageUrl}`, async () => {
    await when(`we get its title`, async () => {
      await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      const actual = await pagePuppet.title();
      const expected = `bitAdemy`;
      then(`it is ${expected}`, actual, expected);
    });
  });
};
