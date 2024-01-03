"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { OrganizationDetail } from "../portal/[orgId]/Organization";
import { TelFieldElement } from "./PersonForm";

type OrganizationFormProps = {
  title: string;
  submit: (data: any) => Promise<void>;
  initialValues: OrganizationDetail
};

export const OrganizationForm = ({ title, submit, initialValues }: OrganizationFormProps) => {
  return (
    <FormContainer
      defaultValues={initialValues}
      onSuccess={submit}
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
