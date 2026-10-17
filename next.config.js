// Builder dev-tools inject an overlay that intercepts clicks in e2e tests.
// playwright.config.ts sets E2E_TEST=1 for the dev server it starts.
const withBuilderDevTools = require("@builder.io/dev-tools/next")({
  enabled: !process.env.E2E_TEST,
});

// No X-Frame-Options / frame-ancestors on purpose: the Builder visual editor
// embeds the site in an iframe. Add them when Builder is removed.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
});

module.exports = nextConfig;
