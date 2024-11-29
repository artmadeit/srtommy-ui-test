"use client";

import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { useAuthApi } from "../(api)/api";
import React from "react";
import { SnackbarContext } from "../(components)/SnackbarContext";

export default function ComplaintForm() {
  const [active, setActive] = React.useState(false);

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);

  const formContext = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dni: "",
      address: "",
      email: "",
      comment: "",
    },
  });

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={async (formValues) => {
        const api = await getApi();
        await api.post("complaints", {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          dni: formValues.dni,
          address: formValues.address,
          email: formValues.email,
          comment: formValues.comment,
        });
        setActive(!active);
        alert.showMessage("Enviado");
      }}
    >
      <Grid container spacing={4} margin={4} style={{ width: "600px" }}>
        <Grid xs={12}>
          <Typography sx={{ fontSize: "40px" }}>Ingresa tus datos</Typography>
        </Grid>
        <Grid xs={6}>
          <label style={{ color: "#878C8F" }}>Nombre</label>
          <TextFieldElement
            name="firstName"
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
            name="dni"
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
            name="comment"
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
            disabled={active}
            // style={{ background: "#000" }}
          >
            Enviar Mensaje
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}
