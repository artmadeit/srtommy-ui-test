import { test, expect } from "@playwright/test";

test.describe("Registro de eventos", ()=> {

  const locId = 12;
      test("abc", async ({ page })=> {
      const { faker } = await import("@faker-js/faker"); 

      //1 Mock para obtner locación
      await page.route("**/organizations/", async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ id: locId , address: "Calle Principal 123"}),
        });
      });

      //Mock para obtner ponentes
      await page.route("", async(route)=> {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            content: [
              { id: 101, name : "", lastName: "" }, 
              { id: 102, name: "", lastName: "" }
            ],
          }),
        });
      }); 

      //Mock de post
      await page.route("", async (route)=> {
        if(route.request().method()=== "POST") {
          await route.fulfill({
            status: 201,
            body: JSON.stringify({ message: "Mensaje guardado" }),            
          })
        } 
      })

      //2 
      await page.goto(`/portal/${locId}/event`, { waitUntil: "networkidle" });

      //3 Navegación

    })
})
