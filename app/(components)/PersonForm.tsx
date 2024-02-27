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
import { isNaN, isString } from "lodash-es";
import { PersonDetail } from "../portal/[locId]/person/Person";
import { differenceInYears } from "date-fns";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";

type PersonFormProps = {
  initialValues: PersonDetail;
  submit: (data: any) => Promise<void>;
};

export const PersonForm = ({ initialValues, submit }: PersonFormProps) => {
  // const [val, setVal] = React.useState<Date | null>(null);
  const formContext = useForm({
    defaultValues: initialValues,
  });

  const handleChange = (birthdate: Date | null ) => {
    formContext.setValue("birthdate", birthdate);
    // const age = differenceInYears(new Date(), birthdate);
    //           if(isNaN(age)){
    //             return "-";
    //           }
    //           return age

    const age = differenceInYears(new Date(), birthdate);
    formContext.setValue("age", age);
    // if (isNaN(age)) {
    //   return "";
    // }

    // return age;
  };

  //  function calculateAge(date: Date) {
  //   const age = differenceInYears(new Date(), date);
  //   if (isNaN(age)) {
  //     return "";
  //   }

  //   return age;
  // }

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
          {/* <DatePicker
            sx={{ width: "100%" }}
            label="Fecha de nacimiento"
            value={val}
            onChange={handleChange}
          /> */}

          <DatePickerElement
            sx={{ width: "100%" }}
            name="birthdate"
            label="Fecha de nacimiento"
            onChange={handleChange}
          />

          {/* <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha de nacimiento"
            name="birthdate"
                       
            // onChange={handleChange}
            //onchange ver
          /> */}
        </Grid>
        <Grid xs={12}>
          {/* {initialValues.birthdate && isString(initialValues.birthdate)
            ? calculateAge(initialValues.birthdate)
            : ""} */}
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
