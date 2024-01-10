import {
  AutocompleteElement,
  DatePickerElement,
  FormContainer,
  SubmitHandler,
  TextFieldElement,
  TimePickerElement,
  useForm,
} from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_WAIT_MS } from "./helpers/debouncing";
import { OrganizationDetail } from "../portal/[orgId]/Organization";
import { SpringPage } from "../(api)/pagination";
import useSWR from "swr";
import { PersonDetail } from "../portal/[orgId]/person/Person";

type Option = {
  id: number;
  label: string;
};

type Event = {
  name: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  address: string;
  description: string;
  speakers: Option[];
};

type EventFormProps = {
  orgId: number;
  initialValues: any;
  submit: SubmitHandler<Event>;
};

export const EventForm = ({ orgId, initialValues, submit }: EventFormProps) => {
  const [searchTextSpeaker, setSearchTextSpeaker] = React.useState("");

  const formContext = useForm<Event>({
    defaultValues: initialValues,
  });

  const [searchTextDebounced] = useDebounce(
    searchTextSpeaker,
    DEBOUNCE_WAIT_MS
  );

  const { data: organization } = useSWR<OrganizationDetail>(
    `organizations/${orgId}`
  );

  const { data: people } = useSWR<SpringPage<PersonDetail>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      <Grid container spacing={2} padding={2}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Datos del Evento
          </Typography>
        </Grid>
        <Grid xs={12}>
          <TextFieldElement fullWidth name="name" label="Nombre" required />
        </Grid>
        <Grid xs={3}>
          <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha inicio"
            name="startDate"
            required
          />
        </Grid>
        <Grid xs={3}>
          <TimePickerElement
            sx={{ width: "100%" }}
            label="Hora inicio"
            name="startTime"
            required
          />
        </Grid>
        <Grid xs={3}>
          <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha fin"
            name="endDate"
            required
          />
        </Grid>
        <Grid xs={3}>
          <TimePickerElement
            sx={{ width: "100%" }}
            label="Hora fin"
            name="endTime"
            required
          />
        </Grid>
        <Grid xs={12}>
          <AutocompleteElement
            autocompleteProps={{
              freeSolo: true,
              onInputChange: (_event, newInputValue) => {
                formContext.setValue("address", newInputValue);
              },
            }}
            name="address"
            label="Lugar"
            options={[organization?.address]}
          />
        </Grid>
        <Grid xs={12}>
          {/* TODO: make creatable */}
          <AutocompleteElement
            multiple
            autocompleteProps={{
              onInputChange: (_event, newInputValue) => {
                setSearchTextSpeaker(newInputValue);
              },
            }}
            name="speakers"
            label="Ponente(s)"
            options={
              people?.content.map((x) => ({
                id: x.id,
                label: x.firstName + " " + x.lastName,
              })) || []
            }
          />
        </Grid>
        <Grid xs={12}>
          <TextFieldElement
            fullWidth
            name="description"
            label="Descripción"
            multiline
            minRows={4}
          />
        </Grid>
        <Grid xs={6}>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
};
