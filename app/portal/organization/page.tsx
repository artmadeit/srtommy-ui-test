"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
// import { FormContainer, TextFieldElement } from "react-hook-form-mui";
// import { TelFieldElement } from "../person/create/page";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { OrganizationForm } from "./OrganizationForm";

export default function Organization() {
  return (
      <Box>
        <OrganizationForm title="Datos generales de la organización"/>
      </Box>
  );
}


