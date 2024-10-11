"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

export default function ComplaintForm() {
  return (
    <FormContainer onSuccess={() => console.log("Enviando")}>
      <Grid container spacing={4} margin={4} style={{ width: "600px" }}>
        <Grid xs={12}>
          <Typography variant="h5">Ingresa tus datos</Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="name"
            label="Nombre"
            variant="standard"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="lastName"
            label="Apellido"
            variant="standard"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={6}> 
          <TextFieldElement
            name="address"
            label="Dirección"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="confirmEmail"
            label="Confirmar email"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="id"
            label="DNI"
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}
