"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

export default function ProfilePage() {
  return (
    <FormContainer>
      <Grid container p={4}>
        <Grid xs={12}>
          <Typography variant="h4">Perfil</Typography>
        </Grid>
        <Grid>
          <TextFieldElement
            name="email"
            label="Email"
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}
