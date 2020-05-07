module.exports = async function itShouldExist(pagePuppet, pageUrl) {
  console.info(`GIVEN the url: ${pageUrl}`);
  try {
    console.info(`  WHEN is visited`);
    await pagePuppet.goto(pageUrl, { waitUntil: 'networkidle2' });
    console.info(`    THEN it Should Exist a page: ${pageUrl}`);
    console.info(`      🟩 SUCCESS `);
    return 0;
  } catch (error) {
    console.info(`      🔴 FAIL `);
    console.warn({ error });
    return 1;
  }
};
