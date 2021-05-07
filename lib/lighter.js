import chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer';
import request from 'request';
import util from 'util';

const chrome_config = {
  output: 'json',
  chromeFlags: ['--disable-mobile-emulation --headless']
};

export async function arrangeBrowser() {
  const { chrome, chrome_config } = await launchChrome();
  const browser = await connectToChrome(chrome);
  return { chrome, browser, chrome_config };
}

async function launchChrome() {
  const chrome = await chromeLauncher.launch(chrome_config);
  chrome_config.port = chrome.port;
  return { chrome, chrome_config };
}
async function connectToChrome(chrome) {
  const response = await util.promisify(request)(`http://localhost:${chrome.port}/json/version`);
  const { webSocketDebuggerUrl } = JSON.parse(response.body);
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
  return browser;
}
