import { given, then, when } from "../lib/bit.tester.js";

export default async function interaction(pagePuppet) {
  await given(`A term to find on google`, async () => {
    const inputPageUrl = `https://www.duckduckgo.com`;
    const inputTerm = `trainingIT`;
    await pagePuppet.goto(inputPageUrl, { waitUntil: `networkidle2` });    
    // Utiliza XPath para buscar el botón de "Aceptar todo" y hacer clic en él
  try {
    const [acceptButton] = await pagePuppet.$x("//button[contains(text(), 'Aceptar todo')]");
    if (acceptButton) {
      await acceptButton.click();
      console.log("Cookies aceptadas");
    } else {
      console.log("No se encontró el botón de 'Aceptar todo'");
    }
  } catch (error) {
    console.log("Error al intentar hacer clic en el botón de 'Aceptar todo':", error);
  }
    await when(`we search ${inputTerm}`, async () => {
      // Espera el botón de aceptar cookies y haz clic en él
      await pagePuppet.focus("[name=q]");
      await pagePuppet.keyboard.type(inputTerm);
      await pagePuppet.keyboard.press("Enter");
      await pagePuppet.waitForNavigation();
      const actual = await pagePuppet.evaluate(() => window.find(`trainingit.es`));
      let expected = true;
      then(`the related site is found`, actual, expected);
    });
  });
}
