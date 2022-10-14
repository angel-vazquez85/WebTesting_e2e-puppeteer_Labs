import { given, then, when } from "../lib/bit.tester.js";

export default async function existence(pagePuppet) {
  const inputPageUrl = `https://www.trainingit.es/`;
  await given(`A the url ${inputPageUrl}`, async () => {
    await when(`we visit it`, async () => {
      const response = await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      let actual = response.ok();
      let expected = true;
      then(`respond with an ok status code`, actual, expected);
    });
  });
}
