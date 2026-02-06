import { test, expect } from "@playwright/test";

test.describe("Registro de eventos", ()=> {

  const locId = 12;
      test("abc", async ({ page })=> {
      const { faker } = await import("@faker-js/faker"); 

      //1 Mock para obtener locación
      await page.route(`**/organizations/${locId}`, async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ id: locId , address: "Calle Principal 123" }),
        });
      });

      //Mock para obtner ponentes
      await page.route("**/people", async(route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            content: [
              { id: 101, name : "Paul", lastName: "Ricoeur" }, 
              { id: 102, name: "Hans", lastName: "Gadamer" }
            ],
          }),
        });
      }); 

      //Mock de post
      await page.route("**/events", async (route)=> {
        if(route.request().method()=== "POST") {
          await route.fulfill({
            status: 201,
            body: JSON.stringify({ message: "Guardar exitosamente" }),            
          })
        } 
      })

      //2 Navegación
      await page.goto(`/portal/${locId}/event`);

      //Esperamos que cargue un elemento
      await expect(page.getByRole("heading", { name: /eventos y cursos/i })).toBeVisible();

      //3 Abrir el formulario
      const calendarGrid = page.getByRole('grid');
      await calendarGrid.getByRole("gridcell").first().click({ force: true });

      // await page.getByText('10', { exact: true }).first().click();
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });

      //4 Llenar el eventForm
      await page.getByPlaceholder(/Agregar título/i).fill(`Evento ${faker.company.name()}`);
      // const eventName = `Conferencia de ${faker.company.name()}`;
      // título (TextFieldElement)
      // await page.getByPlaceholder(/Agregar título/i).fill(eventName);

      //Lugar 
      const addressInput = page.getByPlaceholder(/Agregar lugar/i);
      await addressInput.fill("Sede central");
      await page.keyboard.press("Enter");
      
      //Speakers con autocomplete     
      const speakerInput = page.getByPlaceholder(/Agregar ponente/i);
      await speakerInput.click();
      await page.getByRole("option", { name: "Paul" }).click(); 
      await page.keyboard.press("Escape");

      //Descripción
      await page.getByPlaceholder(/Agregar descripción/i).fill(faker.lorem.paragraph());

      //5 Guardar 
      const btnGuardar = page.getByRole("button", { name: /Guardar/i });
      await btnGuardar.click();

      //6 Verificación  
      await expect(page.getByText(/Guardar exitosamente/i)).toBeVisible();
      
      console.log("✅ Evento creado")
      
    })
})
