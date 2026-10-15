// Fake Auth0 tenant for e2e. The app reads these as NEXT_PUBLIC_* values (see
// playwright.config.ts webServer.env); the tests intercept every request to
// AUTH0_DOMAIN, so no real Auth0 tenant or login is involved.
export const AUTH0_DOMAIN = "test.auth0.local";
export const AUTH0_CLIENT_ID = "e2e-client";
export const APP_ORIGIN = "http://localhost:3000";
export const ORG_ID = "1";
