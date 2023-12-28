"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { TelFieldElement } from "../person/create/page";

type OrganizationFormProps = {
  title: string;
};

export const OrganizationForm = ({ title }: OrganizationFormProps) => {
  return (
    <FormContainer
      defaultValues={{
        name: "",
        address: "",
        phoneNumber: "+51",
      }}
      onSuccess={(x) => console.log(x)}
    >
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement name="name" label="Nombre" required fullWidth />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            name="address"
            label="Dirección"
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TelFieldElement name="phoneNumber" />
        </Grid>
        <Grid xs={12}>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
};
