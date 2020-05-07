const assert = require('assert').strict;
function assertEqual(actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    console.info(`      🟩 SUCCESS 🟩`);
    return 0;
  } catch (error) {
    console.info(`      🔴 FAIL: expected ${error.expected} but got ${error.actual} `);
    return 1;
  }
}
function assertTrue(actual, failMessage) {
  try {
    assert.ok(actual, failMessage);
    console.info(`      🟩 SUCCESS 🟩`);
    return 0;
  } catch (error) {
    console.info(`      🔴 FAIL: ${failMessage} `);
    return 1;
  }
}
module.exports = {
  assertEqual,
  assertTrue
};
