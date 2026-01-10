// import { test as setup } from "@playwright/test";

// const authfile = "playwright/.auth/user.json";

// setup("authenticate", async ({page})=> {
//     await page.goto("http://localhost:3000");
//     //2) Haz clic en el botón que te lleva a Auth0.
//     const loginButton = page.getByRole("button", { name: "Empieza ahora" });
//     await loginButton.click();
//     //3) Ahora estarás en la URL larga de Auth0.
//     await page.getByRole("button", { name: /google/i}).click();
//     //4)
//     console.log("Esperando a que user inicia sesión manualmente")
//     await page.waitForURL("**/portal", { timeout: 12000});

//     //5) token aparezca en localStorage
//     await page.waitForFunction(()=> localStorage.getItem("token") !== null);

//     //6) Guardamos 
//     await page.context().storageState({ path: authfile});
// })
