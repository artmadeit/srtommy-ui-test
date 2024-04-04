"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { LocationDetail } from "../Location";
import { TelFieldElement } from "../person/PersonForm";

type LocationFormProps = {
  title: string;
  submit: (data: any) => Promise<void>;
  initialValues: LocationDetail
};

export const LocationForm = ({ title, submit, initialValues }: LocationFormProps) => {
  return (
    <FormContainer
      defaultValues={initialValues}
      onSuccess={submit}
    >
      <Grid container spacing={2} margin={4}>
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
