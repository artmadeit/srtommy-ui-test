"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";

export default function ComplaintForm() {
  return (
    <FormContainer onSuccess={() => console.log("Enviando")}>
      <Grid container spacing={4} margin={4} style={{ width: "600px" }}>
        <Grid xs={12}>
          <Typography variant="h5">Ingresa tus datos</Typography>
        </Grid>
        <Grid xs={6}>
          <label style={{ color: "#878C8F" }}>Nombre</label>
          <TextFieldElement
            name="name"
            required
            fullWidth
            style={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid xs={6}>
          <label style={{ color: "#878C8F" }}>Apellido</label>
          <TextFieldElement
            name="lastName"
            required
            fullWidth
            style={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid xs={6}>
          <label style={{ color: "#878C8F" }}>DNI</label>
          <TextFieldElement
            name="id"
            required
            fullWidth
            style={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid xs={6}>
          <label style={{ color: "#878C8F" }}>Dirección</label>
          <TextFieldElement
            name="address"
            required
            fullWidth
            style={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid xs={12}>
          <label style={{ color: "#878C8F" }}>Email</label>
          <TextFieldElement
            name="email"
            type="email"
            required
            fullWidth
            style={{ marginTop: "5px" }}
          />
        </Grid>       
        <Grid xs={12}>
          <label style={{ color: "#878C8F" }}>Deja tu comentario</label>
          <TextFieldElement
            name="comments"
            multiline
            rows={2}
            fullWidth
            style={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid xs={6}>
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#000" }}
          >
            Enviar Mensaje
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}
