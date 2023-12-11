"use client";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
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
  const { setValue, watch } = useFormContext();

  const phoneNumber = watch(name);

  return (
    <MuiTelInput
      value={phoneNumber}
      onChange={(value) => setValue("phoneNumber", value.replace(/\s+/g, ""))}
      // TODO: error and helper
      // error={
      // 	touched.phoneNumber &&
      // 	Boolean(errors.phoneNumber)
      // }
      // helperText={
      // 	(touched.phoneNumber &&
      // 		errors.phoneNumber) ||
      // 	""
      // }
      fullWidth
      label="Teléfono"
      onlyCountries={["PE"]}
    />
  );
};
