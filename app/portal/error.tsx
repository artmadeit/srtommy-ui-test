"use client";

import { useEffect } from "react";
import { ErrorMessage } from "../(components)/ErrorMessage";

export default function PortalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorMessage onRetry={reset} />;
}
