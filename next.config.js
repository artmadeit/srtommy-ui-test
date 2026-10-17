// Builder dev-tools inject an overlay that intercepts clicks in e2e tests.
// playwright.config.ts sets E2E_TEST=1 for the dev server it starts.
const withBuilderDevTools = require("@builder.io/dev-tools/next")({
  enabled: !process.env.E2E_TEST,
});

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({});

module.exports = nextConfig;
