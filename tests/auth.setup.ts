import { chromium, test as setup } from "@playwright/test";
import fs from 'fs'; 

const authfile = "playwright/.auth/user.json";

setup("authenticate", async () => {

    setup.setTimeout(0);
    const browser = await chromium.launch({
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    });

    const page = await context.newPage();
    //1. Iniciamos flujo
    await page.goto("http://localhost:3000");
    //2. Haz clic en el botón que te lleva a Auth0.
    const loginButton = page.getByRole("button", { name: "Empieza ahora" });
    await loginButton.click();
    //3. Clic en el botón de Google dentro de Auth0
    await page.getByRole("button", { name: /google/i}).click();
    //4. Pausa para intervención manual
    console.log("----------------------------------------------------------") ;
    console.log("⚠️ ESPERANDO LOGIN MANUAL: Introduce tu email y contraseña");
    console.log("--------------------------------------------------------");
    //Esperamos sin límite de tiempo hasta que llegues al portal
    await page.waitForURL("**/portal**", { timeout: 0 });
    console.log("✅ ¡URL /portal detectada!");

    //*a
    console.log("⏱️ Esperando 10 segundos para asegurar que todo se guarde...");
    await page.waitForTimeout(10000);
    // await page.waitForFunction(() => {
    // return localStorage.getItem("token") !== null || localStorage.length > 5;
    // }, { timeout: 30000 }).catch(() => console.log(" ⚠️ Timeout esperando token, guardando lo que haya..."));

    //*b
    // await page.waitForTimeout(5000);

    //5. Guardamos el estado (Cookies y LocalStorage)
    const state  = await context.storageState({ path: authfile})

    // Verificamos que la carpeta exista antes de escribir
    const folder = 'playwright/.auth';
    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder, { recursive: true });
    }

    // Escribimos el archivo manualmente para asegurar contenido
    fs.writeFileSync(authfile, JSON.stringify(state, null, 2));

    console.log("✅ Sesión guardada con éxito en: ", authfile);
    // Verificación rápida en consola
    console.log(`- Cookies capturadas: ${state.cookies.length}`);
    console.log(`- Orígenes de LocalStorage: ${state.origins.length}`);

    await browser.close();

})

// setup("authenticate", async ({page})=> {

//     // setup.setTimeout(120000);
//     await page.goto("http://localhost:3000");
//     //2) Haz clic en el botón que te lleva a Auth0.
//     const loginButton = page.getByRole("button", { name: "Empieza ahora" });
//     await loginButton.click();
//     //3) Ahora estarás en la URL larga de Auth0.
//     await page.getByRole("button", { name: /google/i}).click();
//     //4)
//     console.log("Esperando a que user inicia sesión manualmente")
//     await page.waitForURL("**/portal**", { timeout: 0 });

//     // //5) token aparezca en localStorage
//     // await page.waitForFunction(()=> {
//     //     return localStorage.getItem("token") !== null;
//     // }, {timeout: 10000});

//     //6) Guardamos 
//     await page.context().storageState({ path: authfile});
//     console.log("✅ Sesión guardada con éxito")
// })
