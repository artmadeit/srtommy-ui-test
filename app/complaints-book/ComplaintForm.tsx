"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

export default function ComplaintForm() {
  return (
    <FormContainer onSuccess={() => console.log("Enviando")}>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <Typography variant="h5">Ingresa tus datos</Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement name="name" label="Nombre" variant="standard" />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="lastName"
            label="Apellido"
            variant="standard"
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}
