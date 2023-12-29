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
import { useAuthApi } from "@/app/(api)/api";
import { usePathname, useRouter } from "next/navigation";

export default function CreatePerson({
  params,
}: {
  params: { orgId: number };
}) {
  const getApi = useAuthApi();
  const router = useRouter();
  const { orgId } = params;

  return (
    <FormContainer
      defaultValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "+51",
        age: null,
        birthdate: null,
      }}
      onSuccess={async (data) => {
        const api = await getApi();
        await api.post("people", data);
        alert("Guardado :)");
        router.push(`/portal/${orgId}/person`);
      }}
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
