import { Button, Grid, Stack, Typography } from "@mui/material";
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import React from "react";
import { GroupTypeLabels } from "./Group";
import { GroupAutocomplete } from "./GroupAutocomplete";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Por favor ingrese el nombre del Grupo o ministerio" }),
  description: z.string().optional(),
  type: z.enum(["GROUP", "MINISTRY"]),
  members: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
    })
  ).nonempty(),
  leaders: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
    })
  ).nonempty(),
});

export const initialValuesSchema = baseSchema;

export type GroupInitialValues = z.infer<typeof initialValuesSchema>;

type GroupFormContext = {
  locId: number;
  initialValues: GroupInitialValues;
  submit: (data: GroupInitialValues) => Promise<void>;
};

export const GroupForm = ({
  locId,
  submit,
  initialValues,
}: GroupFormContext) => {
  const formContext = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(initialValuesSchema),
  });

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      <Stack spacing={2} margin={4}>
        <Typography variant="h5" gutterBottom>
          Datos generales del Grupo / Ministerio
        </Typography>
        <TextFieldElement fullWidth name="name" label="Nombre" required />
        <TextFieldElement
          fullWidth
          name="description"
          label="Descripción"
          multiline
          rows={4}
        />
        <RadioButtonGroup
          label="Tipo"
          name="type"
          options={[
            {
              id: "GROUP",
              label: GroupTypeLabels.GROUP,
            },
            {
              id: "MINISTRY",
              label: GroupTypeLabels.MINISTRY,
            },
          ]}
          row
        />
        <Typography variant="h6" gutterBottom>
          Miembros
        </Typography>
        <Typography variant="body1" gutterBottom>
          Seleccione quienes conforman su grupo / ministerio
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 5 }}
          alignItems="center"
          sx={{ display: { xs: "flex" } }}
        >
          <Typography variant="h6">Lider(es):</Typography>
          <div style={{ width: "100%" }}>
            <GroupAutocomplete
              locId={locId}
              name="leaders"
              label="Escriba/seleccione el lider o lideres"
            />
          </div>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          sx={{ display: { xs: "flex" } }}
        >
          <Typography variant="h6">Miembro(s):</Typography>
          <div style={{ width: "100%" }}>
            <GroupAutocomplete
              locId={locId}
              name="members"
              label="Escriba/seleccione los miembros"
            />
          </div>
          {/* <ErrorMessage errors={errors} name="singleErrorInput" /> */}
        </Stack>
        <Grid>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Grid>
      </Stack>
    </FormContainer>
  );
};
