const assert = require('assert').strict;
module.exports = function assertEqual(actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    return 0;
  } catch (error) {
    console.warn({ error });
    return 1;
  }
};
module.exports = function assertTrue(actual, failMessage) {
  try {
    assert.ok(actual, failMessage);
    return 0;
  } catch (error) {
    console.warn({ error });
    return 1;
  }
};
