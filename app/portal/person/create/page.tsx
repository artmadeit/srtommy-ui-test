"use client";
import { Button, Typography } from "@mui/material";
import {
  Controller,
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { MuiTelInput } from "mui-tel-input";

export default function CreatePerson() {
  return (
    <FormContainer
      defaultValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "+51",
        age: null,
        birthdate: null,
      }}
      onSuccess={(data) => console.log(data)}
    >
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
          <TextFieldElement fullWidth name="lastName" label="Apellido" />
        </Grid>
        <Grid xs={12}>
          <TelFieldElement name="phoneNumber" />
        </Grid>
        <Grid xs={12}>
          <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha de nacimiento"
            name="birthdate"
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
}

const TelFieldElement = ({ name }: { name: string }) => {
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
