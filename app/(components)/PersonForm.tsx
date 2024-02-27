"use client";

import {
  Controller,
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  useForm,
  useFormContext,
} from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { PersonDetail } from "../portal/[locId]/person/Person";
import React from "react";

type PersonFormProps = {
  initialValues: PersonDetail;
  submit: (data: any) => Promise<void>;
};

// function isValidDate(date: Date) {
//   return date instanceof Date && !isNaN(date.getTime());
// }

export const PersonForm = ({ initialValues, submit }: PersonFormProps) => {
  const formContext = useForm({
    defaultValues: initialValues,
  });

  const handleChange = (birthdate: Date | null) => {
    formContext.setValue("birthdate", birthdate);

    // if (birthdate && isValidDate(birthdate)) {
    //   const age = differenceInYears(new Date(), birthdate);
    //   formContext.setValue("age", age);
    // }
  };

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      {JSON.stringify(initialValues)}
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Datos generales de persona
          </Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            fullWidth
            name="firstName"
            label="Nombre"
            required
          />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement
            fullWidth
            name="lastName"
            label="Apellido"
            required
          />
        </Grid>
        <Grid xs={12}>
          <TelFieldElement name="phoneNumber" />
        </Grid>
        <Grid xs={12}>
          <DatePickerElement
            sx={{ width: "100%" }}
            name="birthdate"
            label="Fecha de nacimiento"
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={12}>
          <TextFieldElement fullWidth name="age" label="Edad" type="number" />
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

export const TelFieldElement = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      // rules={{ required: true }}
      render={({ field }) => (
        <MuiTelInput
          name={field.name}
          value={field.value}
          onChange={(value) => {
            field.onChange(value.replace(/\s+/g, ""));
          }}
          // required
          // TODO: error and helper
          error={
            Boolean(errors[name])
            // touched.phoneNumber &&
            // Boolean(errors.phoneNumber)
          }
          // helperText={
          //   (errors[name]?.message as string) || ""
          //   // (touched.phoneNumber &&
          //   // 	errors.phoneNumber) ||
          //   // ""
          // }
          fullWidth
          label="Teléfono"
          onlyCountries={["PE"]}
        />
      )}
    />
  );
};
