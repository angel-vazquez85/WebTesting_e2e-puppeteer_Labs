exports.given = function (given, scenario) {
  console.group(`GIVEN: ${given}`);
  try {
    scenario();
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
  }
  console.groupEnd();
};

exports.when = function (when, action) {
  console.group(`WHEN: ${when}`);
  try {
    action();
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
  }
  console.groupEnd();
};

exports.then = function (should, assert) {
  const failure = assert.fn(assert.actual, assert.expected);
  if (failure === null) {
    console.log(`THEN : ${should} ✅`);
  } else {
    console.log(
      `THEN : ${should} ❌
      - ${failure}`
    );
  }
};

// exports.then = function (should, actual, expected) {
//   if (actual === expected) {
//     console.log(`THEN : ${should} ✅`);
//   } else {
//     console.log(
//       `THEN : ${should} ❌
//       - Expected: ${expected} but got ${actual}`
//     );
//   }
// };

exports.equals = function (actual, expected) {
  if (actual === expected) return null;
  if (JSON.stringify(actual) === JSON.stringify(expected)) return null;
  return `Expected: ${expected} but got ${actual}`;
};
