const { given, when, then } = require(`../lib/bit.tester`);

module.exports = async function (pagePuppet) {
  await given(`A site url`, async () => {
    const inputPageUrl = `https://www.bitademy.com`;
    await when(`we download content`, async () => {
      await pagePuppet.goto(inputPageUrl, { waitUntil: `networkidle2` });
      const content = await pagePuppet.content();
      const kiloByte = 1024;
      const maximumKiloBytes = 30;
      const maximunExpected = kiloByte * maximumKiloBytes;
      let actual = content.length < maximunExpected;
      let expected = true;
      then(`content is smaller than ${maximunExpected} bytes`, actual, expected);
    });
  });
};
