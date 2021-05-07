export async function given(given, scenario) {
  console.group(`GIVEN: ${given}`);
  await scenario();
  console.groupEnd();
}

export async function when(when, action) {
  console.group(`WHEN: ${when}`);
  try {
    await action();
  } catch (e) {
    console.log(`❌ FAILED: ${e.message}`);
  }
  console.groupEnd();
}

export function then(should, actual, expected) {
  if (actual === expected) {
    console.log(`THEN : ${should} ✅`);
  } else {
    console.log(
      `THEN : ${should} ❌
      - Expected: ${expected} but got ${actual}`
    );
  }
}
