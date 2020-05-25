const { assertTrue } = require('../lib/assert');
module.exports = async function itShouldAllowSubscribe(pagePuppet) {
  let errors = 1;
  console.info(`GIVEN a page with a subscribe form `);
  try {
    console.info(`  WHEN we select the input `);
    await actSelect(pagePuppet, '#MERGE0');
    console.info(`  AND WHEN we type at the selected input `);
    await actType(pagePuppet, 'puppet@bitademy.com');
    console.info(`  AND WHEN we click on the subscribe button `);
    await actClick(pagePuppet, '#subscribe-form > button');
    console.info(`    THEN it Should Allow Subscribe`);
    errors = 0;
  } catch (error) {
    console.warn({ error });
  }
  assertTrue(errors == 0, `Could not complete subscribe process`);
  return errors;
};

async function actSelect(pagePuppet, selector) {
  await pagePuppet.evaluate(function (selector) {
    const down = 10;
    return document.querySelector(selector).scrollBy(0, down);
  }, selector);
  await pagePuppet.focus(selector);
}

async function actType(pagePuppet, value) {
  await pagePuppet.keyboard.type(value);
}

async function actClick(pagePuppet, selector) {
  await pagePuppet.click(selector);
}
