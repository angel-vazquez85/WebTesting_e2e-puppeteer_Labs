import { getAudits } from '../lib/auditor';
import { given, then, when } from '../lib/bit.tester';
import { arrangeBrowser } from '../lib/lighter';

export async function () {
  await given(`A deployed site`, async () => {
    const inputPageUrl = `https://www.bitademy.com`;
    const { chrome, browser, chrome_config } = await arrangeBrowser();
    await when(`we get the page audit scores`, async () => {
      const audits = await getAudits(inputPageUrl, chrome_config);
      const minimumExpected = 0.89;
      const expected = true;
      const score = audits.find(a => a.id === 'speed-index').score;
      const actual = score > minimumExpected;
      then(`Speed Index faster than ${minimumExpected}`, actual, expected);
    });
    browser.disconnect();
    await chrome.kill();
  });
};

