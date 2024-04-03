import {
  AutocompleteElement,
  DatePickerElement,
  FormContainer,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useDebounce } from "use-debounce";
import useSWR from "swr";
import { LocationDetail } from "../portal/[locId]/Location";
import { SpringPage } from "../(api)/pagination";
import { PersonDetailWithId } from "../portal/[locId]/person/Person";
import { DEBOUNCE_WAIT_MS } from "./helpers/debouncing";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";

type Option = {
  id: number;
  label: string;
};

export type CourseFormValues = {
  name: string;
  startDate?: Date;
  startTime: Date | null;
  endDate?: Date;
  endTime: Date | null;
  address: string;
  speakers: Option[];
  description: string;
};

type CourseCreatePageProps = {
  locId: number;
  initialValues: CourseFormValues;
  submit: SubmitHandler<CourseFormValues>;
};

export const CourseForm = ({
  locId,
  initialValues,
  submit,
}: CourseCreatePageProps) => {
  const [searchTextSpeaker, setSearchTextSpeaker] = React.useState("");

  const formContext = useForm<CourseFormValues>({
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

  // const formContext = useForm({
  //   defaultValues: {
  //     name: "",
  //     address: "",
  //     startDate: null,
  //     startTime: null,
  //     endDate: null,
  //     endTime: null,
  //     description: "",
  //     speakers: "",
  //   },
  // });

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
          <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha Inicio"
            name="startDate"
            required
          />
        </Grid>
        <Grid xs={3}>
          <TimePicker
            sx={{ width: "100%" }}
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
          <DatePickerElement
            sx={{ width: "100%" }}
            label="Fecha fin"
            name="endDate"
            required
          />
        </Grid>
        <Grid xs={3}>
          <TimePicker
            sx={{ width: "100%" }}
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
};
