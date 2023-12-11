"use client";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  Controller,
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MuiTelInput } from "mui-tel-input";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        <TextFieldElement name="firstName" label="Nombre" required />
        <TextFieldElement name="lastName" label="Apellido" />
        <TelFieldElement name="phoneNumber" />
        <DatePickerElement label="Fecha de nacimiento" name="birthdate" />
        <TextFieldElement name="age" label="Edad" type="number" />
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </FormContainer>
    </LocalizationProvider>
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
