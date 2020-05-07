module.exports = async function itShouldAllowSubscribe(pagePuppet) {
  try {
    console.info(`it Should Allow Subscribe`);
    await actSelect(pagePuppet, '#MERGE0');
    await actType(pagePuppet, 'puppet@bitademy.com');
    await actClick(pagePuppet, '#subscribe-form > button');
    return 0;
  } catch (error) {
    console.warn({ error });
    return 1;
  }
};

async function actSelect(pagePuppet, selector) {
  await pagePuppet.evaluate(function (selector) {
    return document.querySelector(selector).scrollBy(0, 10);
  }, selector);
  await pagePuppet.focus(selector);
}

async function actType(pagePuppet, value) {
  await pagePuppet.keyboard.type(value);
}

async function actClick(pagePuppet, selector) {
  await pagePuppet.click(selector);
}
