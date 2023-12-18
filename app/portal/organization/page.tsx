"use client";

import { Grid, Typography } from "@mui/material";
import React from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

export default function Organization() {
  return (
    <FormContainer
      defaultValues={{
        name: "",
        address: "",
      }}
      onSuccess={(x) => console.log(x)}
    >
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Datos generales de la organización
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextFieldElement name="name" label="Nombre" required fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextFieldElement
            name="address"
            label="Dirección"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          Hola
        </Grid>
      </Grid>
    </FormContainer>
  );
}
