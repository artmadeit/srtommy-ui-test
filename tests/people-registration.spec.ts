import {test, expect} from "@playwright/test";
// import {faker } from "@faker-js/faker";

test.describe("Registro de persona", () => {

  const mLocId = 12;
  
  test("formulario de registro", async ({ page }) => {
    //Importación dinámica de faker
    const {faker} = await import("@faker-js/faker");

    await page.route('**/organizations/locations/*/roles', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          { id: 1, name: "Pastor", isPredefined: false },
          { id: 2, name: "Líder de alabanza", isPredefined: false },
          { id: 3, name: "Ujier", isPredefined: true }
        ]),
      });
    });

    await page.route("**/people", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({message: "Persona registrada"})
        })
      } else {
        await route.continue();
      }
    });  

    await page.goto(`/portal/${mLocId}/person/create`, { waitUntil : "networkidle"});

    //ESPERA CLAVE: Esperamos a que el campo "Nombre" sea visible.

    // const firstNameInput = page.getByLabel("Nombre");
    // await firstNameInput.waitFor({ state: "visible", timeout: 30000 });
    // await page.waitForSelector('text=Nombre', { state: 'visible', timeout: 30000 });
    const nombreInput = page.getByLabel(/Nombre/i);
    await nombreInput.waitFor({state: "visible", timeout: 20000});

  const personData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: "9" + faker.string.numeric(8),
  }

  //Llenar campos 
  // await page.getByLabel("Nombre").fill(personData.firstName);
  await nombreInput.fill(personData.firstName);  
  await page.getByLabel(/Apellido/i).fill(personData.lastName);
  await page.getByLabel(/Teléfono/i).pressSequentially(personData.phone);

  // const birthdateInput = page.getByLabel("Fecha de nacimiento"); 
  const birthdateInput = page.getByRole("group", { name: /Fecha de nacimiento/i} ).getByRole("textbox");
  await birthdateInput.fill("1990-01-01");

  await birthdateInput.press("tab");

  const ageValue = await page.getByLabel(/Edad/i).inputValue();
  expect(Number(ageValue)).toBeGreaterThan(0);

  await page.getByLabel("Si").check();

  const rolesInput = page.getByLabel(/Escriba o seleccione/i);
  await rolesInput.click();
  await page.getByRole("option", { name: "Líder"}).click(); 
  
  await rolesInput.click();
  await page.getByRole("option", {name: "Ujier" }).click();

  //interceptar submit 
  // await page.route("**/people", async (route) => {
  //   if(route.request().method() === "POST") {
  //     await route.fulfill({
  //       status: 201, 
  //       contentType: "application/json",
  //       body: JSON.stringify({message: "Persona registrada exitosamente"})
  //     })
  //   } else {
  //     await route.continue();
  //   }
  // })

  //Envio del formulario
  await page.getByRole("button", {name: /Guardar/i}).click();
  console.log("✅ Formulario enviado con éxito")

  });
});




