import {test, expect} from "@playwright/test";
import {faker } from "@faker-js/faker";

test.describe("Registro de persona", () => {

  const mLocId = 12;
  
  test("formulario de registro", async ({ page }) => {

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

  await page.goto(`/portal/${mLocId}/person/create`);

  const personData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: "980702910",
  }

  //Llenar campos 
  await page.getByLabel("Nombre").fill(personData.firstName);  
  await page.getByLabel("Apellido").fill(personData.lastName);
  await page.getByLabel("Teléfono").fill(personData.phone);

  const birthdateInput = page.getByLabel("Fecha de nacimiento"); 
  await birthdateInput.fill("01/01/1990");

  const ageValue = await page.getByLabel("Edad").inputValue();
  expect(Number(ageValue)).toBeGreaterThan(0);

  await page.getByLabel("Si").check();

  const rolesInput = page.getByLabel("Escriba o seleccione el rol(es)");
  await rolesInput.click();
  await page.getByRole("option", { name: "Líder"}).click(); 
  
  await rolesInput.click();
  await page.getByRole("option", {name: "Ujier" }).click();

  //Envio del formulario
  await page.getByRole("button", {name: "Guardar"}).click();

})

})




