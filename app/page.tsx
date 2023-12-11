"use client";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  DatePickerElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormContainer
        defaultValues={{
          firstName: "",
          lastName: "",
          age: null,
          birthdate: null,
        }}
        onSuccess={(data) => console.log(data)}
      >
        <TextFieldElement name="firstName" label="Nombre" required />
        <TextFieldElement name="lastName" label="Apellido" />
        {/* TODO: telefono */}
        <DatePickerElement label="Año de nacimiento" name="birthdate" />
        <TextFieldElement name="age" label="Edad" type="number" />
        <Button type="submit">Submit</Button>
      </FormContainer>
    </LocalizationProvider>
  );
}
