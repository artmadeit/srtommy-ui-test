import { Button, Grid, Stack, Typography } from "@mui/material";
import {
  AutocompleteElement,
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { PersonTable } from "../../person/PersonTable";
import React, { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { GroupTypeLabels } from "./Group";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_WAIT_MS } from "@/app/(components)/helpers/debouncing";
import useSWR from "swr";
import { SpringPage } from "@/app/(api)/pagination";
import { PersonDetailWithId } from "../../person/Person";
import { Option } from "@/app/(components)/Option";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GroupAutocomplete } from "./GroupAutocomplete";

export type GroupDetail = {
  name: string;
  description: string;
  type: "GROUP" | "MINISTRY";
  members: Option[];
  leaders: Option[];
};

type GroupFormContext = {
  locId: number;
  initialValues: GroupDetail;
  submit: (data: GroupDetail) => Promise<void>;
};

export const GroupForm = ({
  locId,
  submit,
  initialValues,
}: GroupFormContext) => {
  const formContext = useForm({
    defaultValues: initialValues,
  });

  const [searchMember, setSearchMember] = React.useState("");
  const [searchTextDebounced] = useDebounce(searchMember, DEBOUNCE_WAIT_MS);

  const { data: people } = useSWR<SpringPage<PersonDetailWithId>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

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
        <Typography variant="h6">Lider(es):</Typography>
        <GroupAutocomplete name="leaders" label="Lider(es)" />
        <Typography variant="h6">Miembro(s):</Typography>
        <GroupAutocomplete name="members" label="Miembros" />
        {/* <AutocompleteElement
          multiple
          autocompleteProps={{
            onInputChange: (_event, newInputValue) => {
              setSearchMember(newInputValue);
            },
          }}
          name="members"
          label="Miembros"
          options={
            people?.content.map((x) => ({
              id: x.id,
              label: x.firstName + " " + x.lastName,
            })) || []
          }
        /> */}
        {/* <PersonTable
          locId={locId}
          dataGridProps={{
            keepNonExistentRowsSelected: true,
            checkboxSelection: true,
            rowSelectionModel: rowSelectionModel,
            onRowSelectionModelChange: (newSelectionModel) => {
              setRowSelectionModel(newSelectionModel);
            },
          }}
        /> */}
        {/* <Grid xs={3}> */}
        <Button type="submit" variant="contained">
          Guardar
        </Button>
        {/* </Grid> */}
      </Stack>
    </FormContainer>
  );
};
