import { Button, Grid, Stack, Typography } from "@mui/material";
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import React from "react";
import { GroupTypeLabels } from "./Group";
import { Option } from "@/app/(components)/Option";
import { GroupAutocomplete } from "./GroupAutocomplete";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Por favor ingrese el nombre del Grupo o ministerio" }),
  description: z.string().optional(),
  type: z.enum(["GROUP", "MINISTRY"]),
  members: z
    .array(
      z.object({
        id: z.number(),
        label: z.string(),
      })
    )
    .nonempty()
    .min(1, {
      message:
        "Por favor ingrese al menos un miembro para habilitar el grupo/ministerio",
    }),
  leaders: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
    })
  ),
});

export type GroupDetailForm = z.infer<typeof schema>;

type GroupFormContext = {
  locId: number;
  initialValues: GroupDetailForm;
  submit: (data: GroupDetailForm) => Promise<void>;
};

export const GroupForm = ({
  locId,
  submit,
  initialValues,
}: GroupFormContext) => {
  const formContext = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  // useEffect(() => {
  //   if (eventAttendance) {
  //     setRowSelectionModel(eventAttendance.personIds);
  //   }
  // }, [eventAttendance]);

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
        <Stack direction="row" spacing={5} alignItems="center">
          <Typography variant="h6">Lider(es):</Typography>
          <div style={{ width: "100%" }}>
            <GroupAutocomplete
              locId={locId}
              name="leaders"
              label="Escriba o seleccione el lider o lideres del grupo/ministerio"
            />
          </div>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6">Miembro(s):</Typography>
          <div style={{ width: "100%" }}>
            <GroupAutocomplete
              locId={locId}
              name="members"
              label="Escriba o seleccione los miembros del grupo/ministerio"
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
