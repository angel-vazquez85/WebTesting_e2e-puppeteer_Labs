import path from 'path';
import puppeteer from 'puppeteer';

let browser = null;
export async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 768, height: 1024 },
      devtools: false
    });
  }
  return browser;
}

export async function closeBrowser(browser) {
  await browser.close();
}

export async function takeScreenshot(pagePuppet) {
  const timeStamp = new Date().getTime();
  const shotPath = path.join(process.cwd(), 'output', `${timeStamp}.png`);
  await pagePuppet.screenshot({
    path: shotPath,
    fullPage: false
  });
}
