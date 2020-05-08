const { assertTrue } = require('../lib/assert');
const chromeLauncher = require('chrome-launcher');
const lh_desktop_config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');
const request = require('request');
const util = require('util');
const config = {
  output: 'json',
  chromeFlags: ['--disable-mobile-emulation --headless']
};
module.exports = async function itShouldBeFast() {
  const inputPageUrl = 'https://www.bitademy.com';
  const { chrome, browser } = await arrangeBrowser();
  console.info(`GIVEN chrome attached : ${chrome.port}`);
  console.info(`  WHEN ${inputPageUrl} is scanned with lighthouse`);
  const actualAudits = await actGetReport(inputPageUrl);
  const actual = getSpeedIndex(actualAudits).score;
  const minimunExpected = 0.89;
  console.info(`    THEN it Should be faster than: ${minimunExpected}`);
  const failMessage = `     Actual Speed Index ${actual} is lower than minimum expected ${minimunExpected}`;
  await afterAll({ chrome, browser });
  return assertTrue(actual > minimunExpected, failMessage);
};

async function arrangeBrowser() {
  const chrome = await launchChrome();
  console.info(`chrome.port : ${chrome.port}`);
  const browser = await connectToChrome(chrome);
  return { chrome, browser };
}

async function launchChrome() {
  const chrome = await chromeLauncher.launch(config);
  config.port = chrome.port;
  console.log(`Chrome launched at port: ${chrome.port}`);
  return chrome;
}
async function connectToChrome(chrome) {
  const resp = await util.promisify(request)(`http://localhost:${chrome.port}/json/version`);
  const { webSocketDebuggerUrl } = JSON.parse(resp.body);
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
  console.log(`Browser connected at url: ${browser._connection._url}`);
  return browser;
}

async function actGetReport(url) {
  lh_desktop_config.settings.skipAudits = null;
  lh_desktop_config.settings.onlyAudits = ['speed-index'];
  const report = await lighthouse(url, config, lh_desktop_config).then(results => {
    return results;
  });
  const audits = getSimpleArray(report.lhr.audits);
  console.log(`lighthouse audits: ${JSON.stringify(audits)}`);
  return audits;
}

function getSimpleArray(property) {
  return Object.keys(property).map(x => ({
    id: x,
    title: property[x].title,
    score: property[x].score
  }));
}
function getSpeedIndex(audits) {
  return audits.find(a => a.id === 'speed-index');
}

async function afterAll({ chrome, browser }) {
  browser.disconnect();
  await chrome.kill();
}
