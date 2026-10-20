"use client";

import { useEffect } from "react";

// Replaces the root layout when it fails, so it cannot use MUI or the theme.
export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>Algo salió mal</h1>
        <p>La aplicación encontró un error. Puedes intentarlo de nuevo.</p>
        <button onClick={reset}>Reintentar</button>
      </body>
    </html>
  );
}
