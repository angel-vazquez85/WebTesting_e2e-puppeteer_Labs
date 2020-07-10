const { given, when, then } = require(`../lib/bit.tester`);

module.exports = async function (pagePuppet) {
  await given(`Any page of my site`, async () => {
    const inputPageUrl = `https://www.bitademy.com`;
    const inputUserAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    await pagePuppet.setUserAgent(inputUserAgent);
    await pagePuppet.setViewport({ width: 375, height: 812 });
    await when(`we visit emulating an iPhone`, async () => {
      await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      const actual = await pagePuppet.evaluate(() => {
        const nav = document.getElementById(`main-navigation`);
        const style = window.getComputedStyle(nav, ``);
        return style.getPropertyValue(`visibility`);
      });
      const expected = `hidden`;
      then(`it hides main-navigation`, actual, expected);
    });
  });
};
