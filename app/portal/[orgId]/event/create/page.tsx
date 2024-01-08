"use client";
import { Button, Typography } from "@mui/material";
import {
  AutocompleteElement,
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  TimePickerElement,
  useForm,
} from "react-hook-form-mui";

import { SpringPage } from "@/app/(api)/pagination";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import useSWR from "swr";
import { OrganizationDetail } from "../../Organization";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_WAIT_MS } from "@/app/(components)/helpers/debouncing";
import { PersonDetail } from "../../person/Person";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
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

export default function EventCreatePage({
  params,
}: {
  params: { orgId: number };
}) {
  const { orgId } = params;
  const formContext = useForm<Event>({
    defaultValues: {
      name: "",
      // startDate: null,
      // startTime: null,
      // endDate: null,
      // endTime: null,
      address: "",
      description: "",
      speakers: [],
    },
  });

  const [searchTextSpeaker, setSearchTextSpeaker] = useState("");
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);
  const { data: organization } = useSWR<OrganizationDetail>(
    `organizations/${orgId}`
  );

  const [searchTextDebounced] = useDebounce(
    searchTextSpeaker,
    DEBOUNCE_WAIT_MS
  );
  const { data: people } = useSWR<SpringPage<PersonDetail>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

  function getDateTime(date: Date, time: Date) {
    return `${date.toISOString().split("T")[0]}T${
      time.toISOString().split("T")[1]
    }`;
  }

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={async (values) => {
        // const { startDate, endDate, startTime, endTime,
        //    ...rest} = values;
        const data = {
          name: values.name,
          address: values.address,
          organizationId: orgId,
          startTime: getDateTime(values.startDate, values.startTime),
          endTime: getDateTime(values.endDate, values.endTime),
          speakerIds: values.speakers.map((x) => x.id),
          description: values.description,
        };

        const response = await getApi().then((api) =>
          api.post(`/events`, data)
        );
        alert.showMessage("Evento registrado exitosamente");
        router.push(`/portal/${orgId}/event`);
        // console.log(values.speakers);
        // console.log(data)
      }}
    >
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
}
