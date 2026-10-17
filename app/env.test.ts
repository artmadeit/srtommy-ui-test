import { afterEach, describe, expect, it, vi } from "vitest";

const load = async () => {
  vi.resetModules();
  return (await import("./env")).env;
};

describe("env", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("reads the validated public variables", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH0_DOMAIN", "tenant.example.com");
    vi.stubEnv("NEXT_PUBLIC_AUTH0_CLIENT_ID", "client");

    const env = await load();

    expect(env.NEXT_PUBLIC_AUTH0_DOMAIN).toBe("tenant.example.com");
    expect(env.NEXT_PUBLIC_AUTH0_AUDIENCE).toBeUndefined();
    expect(env.NEXT_PUBLIC_API_URL).toBe("");
  });

  it("fails naming the missing variables", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH0_DOMAIN", "");
    vi.stubEnv("NEXT_PUBLIC_AUTH0_CLIENT_ID", "");

    await expect(load()).rejects.toThrow(
      /NEXT_PUBLIC_AUTH0_DOMAIN, NEXT_PUBLIC_AUTH0_CLIENT_ID/,
    );
  });
});
