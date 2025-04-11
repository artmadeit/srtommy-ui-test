import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import React from "react";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  FormContainer,
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
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { WeekChips } from "./WeekChips";
import { ToogleButton } from "./ToogleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// export type EventFormValues = {
//   name: string;
//   date?: Date;
//   startTime?: Date | null;
//   endTime?: Date | null;
//   endRecur?: Date | null;
//   address: string;
//   isRecurrent: boolean;
//   description: string;
//   daysOfWeek: number[];
//   type: number;
//   speakers: Option[];
// };

const schema = z.object({
  name: z.string(),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  endRecur: z.date().optional(),
  address: z.string(),
  isRecurrent: z.boolean(),
  description: z.string().optional(),
  daysOfWeek: z.array(z.number()),
  type: z.number(),
  speakers: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
    })
  ),
});

export type EventDetailFormData = z.infer<typeof schema>;

type EventFormProps = {
  locId: number;
  initialValues: EventDetailFormData;
  submit: SubmitHandler<EventDetailFormData>;
  editable: boolean;
};

export const EventForm = ({
  locId,
  initialValues,
  submit,
  editable,
}: EventFormProps) => {
  const [searchTextSpeaker, setSearchTextSpeaker] = React.useState("");

  const formContext = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const watch = formContext.watch;
  const watchIsRecurrent = watch("isRecurrent");

  const [searchTextDebounced] = useDebounce(
    searchTextSpeaker,
    DEBOUNCE_WAIT_MS
  );

  const { data: Location } = useSWR<LocationDetail>(`organizations/${locId}`);

  const { data: people } = useSWR<SpringPage<PersonDetailWithId>>([
    `people`,
    {
      params: {
        organizationId: locId,
        ...(searchTextDebounced ? { searchText: searchTextDebounced } : {}),
      },
    },
  ]);

  const daysOfWeek = watch("daysOfWeek");
  const type = watch("type");

  return (
    <FormContainer formContext={formContext} onSuccess={submit}>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <TextFieldElement
            fullWidth
            name="name"
            placeholder="Agregar título"
            sx={{ padding: "10px 0px" }}
            variant="standard"
            error={true}
            helperText={"hola"}
            
            autoFocus
          />
        </Grid>
        <Grid xs={12}>
          <ToogleButton
            eventType={type}
            onChange={(type) => formContext.setValue("type", type)}
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
            onChange={(value) => {
              if (value !== null) {
                formContext.setValue("startTime", value);
              }
            }}
            // onChange={(value) => console.log(typeof value)}
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
            // onChange={(value) => formContext.setValue("endTime", value)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </Grid>
        <Grid xs={12}>
          <CheckboxElement
            onChange={(e) => {
              if (e.target.checked) {
                const date = formContext.getValues().date;
                formContext.setValue("daysOfWeek", date ? [date.getDay()] : []);
              } else {
                formContext.setValue("daysOfWeek", []);
              }
            }}
            name="isRecurrent"
            label="Se repite"
          />
          {watchIsRecurrent && (
            <Box>
              <Typography sx={{ padding: "10px 0px" }}>Repetir el</Typography>
              <WeekChips
                chipsValue={daysOfWeek}
                onChange={(daysOfWeek) =>
                  formContext.setValue("daysOfWeek", daysOfWeek)
                }
              />
              <Box
                sx={{
                  padding: "10px 0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography>Finaliza el: </Typography>
                <Grid xs={4}>
                  <DatePickerElement
                    name="endRecur"
                    inputProps={{
                      sx: {
                        width: "170px",
                      },
                    }}
                  />
                </Grid>
              </Box>
            </Box>
          )}
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
              size: "small",
            }}
            textFieldProps={{
              placeholder: " Agregar ponente(s)",
              variant: "standard",
              sx: {
                padding: "10px 0px",
              },
            }}
            name="speakers"
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
            multiline
            minRows={1}
            InputProps={{
              placeholder: "Agregar descripción",
            }}
            variant="standard"
          />
        </Grid>
        <Grid xs={6}>
          {editable && (
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          )}
        </Grid>
      </Grid>
    </FormContainer>
  );
};
