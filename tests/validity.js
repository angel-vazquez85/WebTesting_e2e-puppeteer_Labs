const { given, when, then } = require(`../lib/bit.tester`);

module.exports = async function (pagePuppet) {
  await given(`A site url`, async () => {
    const inputPageUrl = `https://www.bitademy.com`;
    await when(`we scrap it for broken links`, async () => {
      await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      const actual = await pagePuppet.evaluate(() =>
        window.find(`a:is(:not([href]),[href=""],[href="#"])`)
      );
      let expected = false;
      then(`have no one`, actual, expected);
    });
  });
};
