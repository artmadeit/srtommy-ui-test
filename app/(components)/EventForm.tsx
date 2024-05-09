import { Button, InputAdornment, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import React from "react";
import {
  AutocompleteElement,
  DatePickerElement,
  FormContainer,
  SelectElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { SpringPage } from "../(api)/pagination";
import { LocationDetail } from "../portal/[locId]/Location";
import { PersonDetailWithId } from "../portal/[locId]/person/Person";
import { DEBOUNCE_WAIT_MS } from "./helpers/debouncing";
import { Option } from "./Option";
import PlaceIcon from "@mui/icons-material/Place";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GroupIcon from "@mui/icons-material/Group";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

export type EventFormValues = {
  name: string;
  date?: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  address: string;
  description: string;
  speakers: Option[];
};

type EventFormProps = {
  locId: number;
  initialValues: EventFormValues;
  submit: SubmitHandler<EventFormValues>;
};

export const EventForm = ({ locId, initialValues, submit }: EventFormProps) => {
  const [searchTextSpeaker, setSearchTextSpeaker] = React.useState("");

  const formContext = useForm<EventFormValues>({
    defaultValues: initialValues,
  });

  const [searchTextDebounced] = useDebounce(
    searchTextSpeaker,
    DEBOUNCE_WAIT_MS
  );

  const { data: Location } = useSWR<LocationDetail>(`organizations/${locId}`);

  const { data: people } = useSWR<SpringPage<PersonDetailWithId>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      <Grid container spacing={2} margin={4}>
        {/* <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Datos del Evento
          </Typography>
        </Grid> */}
        <Grid xs={12}>
          <TextFieldElement
            fullWidth
            name="name"
            placeholder="Agregar título"
            sx={{ padding: "10px 0px" }}
            variant="standard"
            required
            autoFocus
          />
        </Grid>
        <Grid xs={4}>
          <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha"
            name="date"
            required
          />
        </Grid>
        <Grid xs={4}>
          <TimePicker
            ampm
            sx={{ width: "100%" }}
            value={formContext.getValues().startTime}
            onChange={(value) => formContext.setValue("startTime", value)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </Grid>
        <Grid xs={4}>
          <TimePicker
            ampm
            sx={{ width: "100%" }}
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
          <SelectElement
            label="No se repite"
            name="b"
            sx={{ width: "100%" }}
            options={[
              {
                id: 1,
                label: "Cada Domingo",
              },
              {
                id: 2,
                label: "Cada semana, el jueves",
              },
              {
                id: 3,
                label: "c",
              },
            ]}
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
            textFieldProps={{
              InputProps: {
                startAdornment: <PlaceOutlinedIcon />,
              },
              placeholder: " Agregar lugar",
              variant: "standard",
              sx: {
                padding: "10px 0px",
              },
            }}
            name="address"
            // label="Agregar lugar"
            options={[Location?.address]}
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
            textFieldProps={{
              InputProps: {
                startAdornment: <GroupOutlinedIcon />,
              },
              placeholder: " Agregar ponente(s)",
              variant: "standard",
              sx: {
                padding: "10px 0px",
              },
            }}
            name="speakers"
            // label="Ponente(s)"
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
            // label="Agregar descripción"
            multiline
            minRows={4}
            InputProps={{
              placeholder: "Agregar descripción",
            }}
            variant="standard"
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
