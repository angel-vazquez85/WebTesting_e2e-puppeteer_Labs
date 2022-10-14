import { given, then, when } from "../lib/bit.tester.js";

export default async function emulation(pagePuppet) {
  await given(`Any page of my site`, async () => {
    const inputPageUrl = `https://www.trainingit.es/`;
    const inputUserAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    await pagePuppet.setUserAgent(inputUserAgent);
    await pagePuppet.setViewport({ width: 375, height: 812 });
    await when(`we visit emulating an iPhone`, async () => {
      await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      const actual = await pagePuppet.evaluate(() => {
        const main = document.getElementById(`main-content`);
        return main.getBoundingClientRect().width;
      });
      const expected = 375;
      then(`it shows main content`, actual, expected);
    });
  });
}
