const assert = require('assert').strict;
module.exports = function assertEqual(actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    console.info(`      🟩 SUCCESS `);
    return 0;
  } catch (error) {
    console.info(`      🔴 FAIL `);
    console.warn({ error });
    return 1;
  }
};
module.exports = function assertTrue(actual, failMessage) {
  try {
    assert.ok(actual, failMessage);
    console.info(`      🟩 SUCCESS `);
    return 0;
  } catch (error) {
    console.warn({ error });
    return 1;
  }
};
