"use client";

import { Box, Button, Typography } from "@mui/material";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h5" component="h1" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        La página que buscas no existe o fue movida.
      </Typography>
      <Button component={NextLink} href="/" variant="contained" sx={{ mt: 2 }}>
        Volver al inicio
      </Button>
    </Box>
  );
}
