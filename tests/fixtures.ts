import { test as base, expect } from "@playwright/test";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, APP_ORIGIN, ORG_ID } from "./e2e-env";

// Auth0 silent login (prompt=none, response_mode=web_message) answers in an
// iframe with a postMessage. The token request then returns an id_token whose
// claims the SDK checks (iss, aud, nonce, sub, alg RS256). The SDK does not
// verify the signature in the browser, so a placeholder signature is enough.
const base64url = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

async function mockAuth0(page: import("@playwright/test").Page) {
  let nonce = "";

  await page
    .context()
    .addCookies([
      { name: "auth0.is.authenticated", value: "true", url: APP_ORIGIN },
    ]);

  await page.route(`**/${AUTH0_DOMAIN}/**`, async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname === "/authorize") {
      const state = url.searchParams.get("state") ?? "";
      if (url.searchParams.get("prompt") === "none") {
        nonce = url.searchParams.get("nonce") ?? "";
      }
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `<script>parent.postMessage({type:"authorization_response",response:{code:"e2e-code",state:${JSON.stringify(state)}}},"*");</script>`,
      });
      return;
    }

    if (url.pathname === "/oauth/token") {
      const now = Math.floor(Date.now() / 1000);
      const header = base64url({ alg: "RS256", typ: "JWT", kid: "e2e" });
      const payload = base64url({
        iss: `https://${AUTH0_DOMAIN}/`,
        aud: AUTH0_CLIENT_ID,
        sub: "auth0|e2e-user",
        iat: now,
        exp: now + 3600,
        nonce,
        name: "E2E User",
        email: "e2e@example.com",
        "https://sr-tommy.com/orgId": ORG_ID,
      });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "e2e-access-token",
          id_token: `${header}.${payload}.e2e-signature`,
          expires_in: 86400,
          token_type: "Bearer",
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
}

// Every test starts logged in. Register API mocks after this fixture runs so
// they take precedence (Playwright matches the most recent route first).
export const test = base.extend({
  page: async ({ page }, use) => {
    await mockAuth0(page);
    await use(page);
  },
});

export { expect };
