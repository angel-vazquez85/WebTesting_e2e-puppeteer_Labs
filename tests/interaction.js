module.exports = async function itShouldAllowSubscribe(pagePuppet) {
  console.info(`GIVEN a page with a subscribe form `);
  try {
    console.info(`  WHEN we select the input `);
    await actSelect(pagePuppet, '#MERGE0');
    console.info(`  AND WHEN we type at the selected input `);
    await actType(pagePuppet, 'puppet@bitademy.com');
    console.info(`  AND WHEN we click on the subscribe button `);
    await actClick(pagePuppet, '#subscribe-form > button');
    console.info(`    THEN it Should Allow Subscribe`);
    console.info(`      🟩 SUCCESS `);
    return 0;
  } catch (error) {
    console.info(`      🔴 FAIL `);
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
