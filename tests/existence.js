const { given, when, then } = require(`../lib/bit.tester`);

module.exports = async function (pagePuppet) {
  await given(`A site url`, async () => {
    const inputPageUrl = `https://www.bitademy.com`;
    await when(`we visit it`, async () => {
      const response = await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      let actual = response.ok();
      let expected = true;
      then(`respond with an ok status code`, actual, expected);
      actual = await pagePuppet.title();
      expected = `bitAdemy`;
      then(`have a correct title`, actual, expected);
    });
  });
};
