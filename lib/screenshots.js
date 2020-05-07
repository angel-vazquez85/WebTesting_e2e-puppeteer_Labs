module.exports = async function takeScreenshot(pagePuppet) {
  await pagePuppet.screenshot({
    path: '',
    fullPage: true
  });
};
