"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { OrganizationForm } from "./OrganizationForm";

export default function Organization() {
  return (
    <Box>
      <OrganizationForm
        title="Datos generales de la organización"
        submit={async () => await console.log("Click =D")}
      />
    </Box>
  );
}
