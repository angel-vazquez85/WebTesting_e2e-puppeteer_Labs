const { given, when, then } = require(`../lib/bit.tester`);
const chromeLauncher = require('chrome-launcher');
const lh_desktop_config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');
const request = require('request');
const util = require('util');
const chrome_config = {
  output: 'json',
  chromeFlags: ['--disable-mobile-emulation --headless']
};

module.exports = async function () {
  await given(`A deployed site`, async () => {
    const inputPageUrl = `https://www.bitademy.com`;
    const { chrome, browser } = await arrangeBrowser();
    await when(`we get the page audit scores`, async () => {
      const actualAudits = await getAudits(inputPageUrl);
      const minimunExpected = 0.89;
      const expected = true;
      let score = getAuditScore(actualAudits, 'speed-index');
      let actual = score > minimunExpected;
      then(`Speed Index faster than ${minimunExpected}`, actual, expected);
      score = getAuditScore(actualAudits, 'first-meaningful-paint');
      actual = score > minimunExpected;
      then(`First Meaningful Paint better than ${minimunExpected}`, actual, expected);
      score = getAuditScore(actualAudits, 'first-cpu-idle');
      actual = score > minimunExpected;
      then(`First CPU Idle better than ${minimunExpected}`, actual, expected);
      score = getAuditScore(actualAudits, 'interactive');
      actual = score > minimunExpected;
      then(`Time to Interactive better than ${minimunExpected}`, actual, expected);
    });
    await afterAll({ chrome, browser });
  });
};

async function arrangeBrowser() {
  const chrome = await launchChrome();
  const browser = await connectToChrome(chrome);
  return { chrome, browser };
}

async function launchChrome() {
  const chrome = await chromeLauncher.launch(chrome_config);
  chrome_config.port = chrome.port;
  return chrome;
}
async function connectToChrome(chrome) {
  const response = await util.promisify(request)(`http://localhost:${chrome.port}/json/version`);
  const { webSocketDebuggerUrl } = JSON.parse(response.body);
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
  return browser;
}

async function getAudits(url) {
  lh_desktop_config.settings.skipAudits = null;
  lh_desktop_config.settings.onlyAudits = [
    'first-meaningful-paint',
    'speed-index',
    'first-cpu-idle',
    'interactive'
  ];
  const lh_audits = await lighthouse(url, chrome_config, lh_desktop_config).then(
    results => results.lhr.audits
  );
  return mapToSimpleArray(lh_audits);
}

function mapToSimpleArray(lh_audits) {
  return Object.keys(lh_audits).map(audit => ({
    id: audit,
    title: lh_audits[audit].title,
    score: lh_audits[audit].score
  }));
}
function getAuditScore(audits, auditId) {
  return audits.find(a => a.id === auditId).score;
}

async function afterAll({ chrome, browser }) {
  browser.disconnect();
  await chrome.kill();
}
