const { assertTrue } = require('../lib/assert');
module.exports = async function itShouldExist(pagePuppet) {
  let errors = 1;
  const inputPageUrl = 'https://www.bitademy.com';
  console.info(`GIVEN the url: ${inputPageUrl}`);
  try {
    console.info(`  WHEN is visited`);
    await pagePuppet.goto(inputPageUrl, { waitUntil: 'networkidle2' });
    console.info(`    THEN it Should Exist a page: ${inputPageUrl}`);
    errors = 0;
  } catch (error) {
    console.warn({ error });
  }
  assertTrue(errors == 0, `Could not visit the url: ${inputPageUrl}`);
  return errors;
};
