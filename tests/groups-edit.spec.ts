import { test } from "@playwright/test";

test.describe("Editar Grupos y ministerios", () => {
  // const locId = 12; 
  const groupId = 13;

  test.beforeEach( async ({ page }) => {
    //1.
    await page.route(`**/organizations/${groupId}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          name: "Grupo de Jóvenes",
          description: "Reunión de los sábados",
          type: "GROUP",
        }),
      });
    });
    //2. Mocks de miembros y líderes
    await page.route(`**/organizations/locations/childs/${groupId}/members`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          LEADER: [{ id: 1, firstName: "Juan", LastName: "Perez"}],
          IS_PART_OF: [{ id: 2, firstName: "Maria", lastName: "Garcia"}],          
        }),
      });
    });
    //3. Mock para el Autocomplete 
    await page.route("**/people**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          content: [
            { id: 1, firstName: "Juan", lastName: "Perez" },
            { id: 2, firstName: "Maria", lastName: "Garcia" },
            { id: 3, firstName: "Pedro", lastName: "Picapiedra" },
          ],
        }),
      });
    });
  });



})