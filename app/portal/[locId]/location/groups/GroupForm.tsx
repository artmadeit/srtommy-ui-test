import { Button, Stack, Typography } from "@mui/material";
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { PersonTable } from "../../person/PersonTable";
import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { GroupTypeLabels } from "./Group";

export type GroupDetail = {
  name: string;
  description: string;
  type: "GROUP" | "MINISTRY";
};

type GroupFormContext = {
  locId: number;
  initialValues: GroupDetail;
  submit: (data: any) => Promise<void>;
};

export const GroupForm = ({
  locId,
  submit,
  initialValues,
}: GroupFormContext) => {
  const formContext = useForm({
    defaultValues: initialValues,
  });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

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
        <Typography variant="h5" gutterBottom>
          Miembros
        </Typography>
        <Typography variant="body1" gutterBottom>
          Seleccione quienes conforman su grupo / ministerio
        </Typography>
        <PersonTable
          locId={locId}
          dataGridProps={{
            keepNonExistentRowsSelected: true,
            checkboxSelection: true,
            rowSelectionModel: rowSelectionModel,
            onRowSelectionModelChange: (newSelectionModel) => {
              setRowSelectionModel(newSelectionModel);
            },
          }}
        />
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </Stack>
    </FormContainer>
  );
};
