"use client";

import { SpringPage } from "@/app/(api)/pagination";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import {
  AutocompleteElement,
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import useSWR from "swr";
import { PersonDetail } from "../../person/Person";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_WAIT_MS } from "@/app/(components)/helpers/debouncing";
import { LocationDetail } from "../../Location";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";

type CourseCreatePageProps = {
  locId: number;
};

export default function CourseCreatePage({ locId }: CourseCreatePageProps) {
  const [searchTextSpeaker, setSearchTextSpeaker] = React.useState("");

  const [searchTextDebounced] = useDebounce(
    searchTextSpeaker,
    DEBOUNCE_WAIT_MS
  );

  const { data: Location } = useSWR<LocationDetail>(`organizations/${locId}`);

  const { data: people } = useSWR<SpringPage<PersonDetail>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

  const formContext = useForm({
    defaultValues: {
      name: "",
      address: "",
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      description: "",
      speakers: "",
    },
  });

  const submit = () => {
    console.log("Guardando");
  };

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      <Grid container spacing={2} m={4}>
        <Grid xs={12}>
          <Typography variant="h5">Datos del curso</Typography>
        </Grid>
        <Grid xs={12}>
          <TextFieldElement fullWidth name="name" label="Nombre" required />
        </Grid>
        <Grid xs={3}>
          <DatePickerElement label="Fecha Inicio" name="startDate" required />
        </Grid>
        <Grid xs={3}>
          <TimePicker
            ampm
            value={formContext.getValues().startTime}
            onChange={(value) => formContext.setValue("startTime", value)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </Grid>
        <Grid xs={3}>
          <DatePickerElement label="Fecha fin" name="endDate" required />
        </Grid>
        <Grid xs={3}>
          <TimePicker
            ampm
            value={formContext.getValues().endTime}
            onChange={(value) => formContext.setValue("endTime", value)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
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
            options={[Location?.address]}
          />
        </Grid>
        <Grid xs={12}>
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
                label: x.firstName + "" + x.lastName,
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
}
