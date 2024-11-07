import { given, then, when } from "../lib/bit.tester.js";

export async function checkContent(pagePuppet) {
  const inputPageUrl = `https://www.trainingit.es/`;
  await given(`A the page at ${inputPageUrl}`, async () => {
    await when(`we get its title`, async () => {
      await pagePuppet.goto(inputPageUrl, { waitUntil: `load` });
      const actual = await pagePuppet.title();
      const expected = `Formación IT online y presencial orientada a desarrolladores - TrainingIT`;
      then(`it is ${expected}`, actual, expected);
    });
  });
}
