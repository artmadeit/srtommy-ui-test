"use client";

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Loading from "../(components)/Loading";

// Single place that sends anonymous visitors to Auth0. Children (and their
// authenticated requests) are not rendered until there is a session. The
// backend is still the authority on permissions.
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) return <Loading />;

  return <>{children}</>;
};
