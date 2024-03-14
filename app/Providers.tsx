"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  if (!(domain && clientId)) {
    throw "Error not configured Auth0 provider!";
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: globalThis.location?.origin + "/portal",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
