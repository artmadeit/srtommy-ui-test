"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Autocomplete, Button, Chip, Typography } from "@mui/material";
import { LocationDetail } from "../Location";
import { TelFieldElement } from "../person/PersonForm";
import React from "react";
import useSWR from "swr";

type LocationFormProps = {
  title: string;
  submit: (data: any) => Promise<void>;
  initialValues: LocationDetail;
};

export const LocationForm = ({
  title,
  submit,
  initialValues,
}: LocationFormProps) => {
  const fixedOptions = churchRoles;
  const [value, setValue] = React.useState([...fixedOptions]);

  return (
    <FormContainer defaultValues={initialValues} onSuccess={submit}>
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
        <Grid xs={12} container alignItems="center">
          <Grid xs={12} sx={{ padding: "0px 0px 0px 8px" }}>
            <Typography variant="h6">Roles en la Iglesia:</Typography>
          </Grid>
          <Grid xs={12}>
            <Autocomplete
              freeSolo
              multiple
              id="fixed-tags-demo"
              options={[]}
              value={value}
              onChange={(event, newValue) => {
                setValue([
                  ...fixedOptions,
                  ...newValue.filter(
                    (option) => fixedOptions.indexOf(option) === -1
                  ),
                ]);
              }}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              renderInput={(params) => (
                <TextFieldElement
                  name="roles"
                  placeholder="Añada otros roles si desea"
                  {...params}
                />
              )}
            />
          </Grid>
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

const churchRoles = ["Pastor", "Líder de alabanza", "Ujier"];
