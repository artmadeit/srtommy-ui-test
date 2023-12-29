"use client";
import { Button, Typography } from "@mui/material";
import {
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  TimePickerElement,
} from "react-hook-form-mui";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function EventCreatePage() {
  return (
    <FormContainer
      defaultValues={{
        name: "",
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        place: "",
        description: "",
        speaker: "",
      }}
      onSuccess={(data) => console.log(data)}
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
          <TextFieldElement fullWidth name="place" label="Lugar" />
        </Grid>
        <Grid xs={12}>
          <TextFieldElement fullWidth name="speaker" label="Ponente" />
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
