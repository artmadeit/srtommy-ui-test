"use client";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

export default function ProfilePage() {
  return (
    <FormContainer>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Perfil
          </Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement name="email" label="Email" type="email" fullWidth />
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5">Pagar en: </Typography>
        </Grid>
      </Grid>
    </FormContainer>
  );
}
