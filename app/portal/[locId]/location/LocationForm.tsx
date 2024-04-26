"use client";

import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Autocomplete, Button, Chip, Typography } from "@mui/material";
import { LocationDetail } from "../Location";
import { TelFieldElement } from "../person/PersonForm";
import React from "react";
import useSWR from "swr";
import { isArray } from "lodash";

type LocationFormValues = {
  name: string;
  address: string;
  phoneNumber: string;
  roles: string[];
};

type LocationFormProps = {
  title: string;
  submit: (data: LocationFormValues) => Promise<void>;
  fixedOptions: string[];
  initialValues: LocationFormValues;
};

export const LocationForm = ({
  title,
  submit,
  initialValues,
  fixedOptions,
}: LocationFormProps) => {
  // const fixedOptions = churchRoles;
  // const [value, setValue] = React.useState([...fixedOptions]);

  const formContext = useForm<LocationFormValues>({
    defaultValues: initialValues,
  });

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
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
              value={formContext.getValues().roles}
              onChange={(event, newValue) => {
                console.log(newValue);
                formContext.setValue(
                  "roles",
                  [
                    ...fixedOptions,
                    ...newValue.filter(
                      (option) => fixedOptions.indexOf(option) === -1
                    ),
                  ],
                  { shouldValidate: true }
                );
              }}
              renderTags={(tagValue, getTagProps) => {
                console.log(tagValue);
                return isArray(tagValue)
                  ? tagValue.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        key={option}
                        disabled={fixedOptions.indexOf(option) !== -1}
                      />
                    ))
                  : null;
              }}
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

// const churchRoles = ["Pastor", "Líder de alabanza", "Ujier"];
