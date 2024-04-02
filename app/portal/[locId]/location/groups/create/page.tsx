"use client";

import { Typography } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function GroupCreatePage() {
  const submit = () => {
    console.log("guardando");
  };
  return (
    <FormContainer onSuccess={submit}>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Datos generales del Grupo/Ministerio
          </Typography>
        </Grid>
        <Grid xs={12}>
          <TextFieldElement fullWidth name="name" label="Nombre" required />
        </Grid>
        <Grid xs={12}>
          <TextFieldElement
            fullWidth
            name="description"
            label="Descripción"
            multiline
            rows={4}
            required
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}
