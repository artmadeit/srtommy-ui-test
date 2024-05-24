"use client";

import { useAuthApi } from "@/app/(api)/api";
import Loading from "@/app/(components)/Loading";
import { Box, Button, Fab, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { PersonTable, fullName } from "../../../person/PersonTable";
import { EventDetail } from "../EventDetail";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { EventForm, EventFormValues } from "@/app/(components)/EventForm";
import DeleteIcon from "@mui/icons-material/Delete";

type EventAttendance = {
  numberOfVisitors: number;
  visitorsDescription: string;
  personIds: number[];
};

export default function AttendanceEvent({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const alert = useContext(SnackbarContext);
  const getApi = useAuthApi();

  const { data: event } = useSWR<EventDetail>(`/events/${id}`);
  const { data: eventAttendance, isLoading } = useSWR<EventAttendance>(
    `/events/${id}/attendance`
  );

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (eventAttendance) {
      setRowSelectionModel(eventAttendance.personIds);
    }
  }, [eventAttendance]);

  if (isLoading) return <Loading />;
  if (!event) return <div>Not found</div>;

  const initialValues: EventFormValues = {
    name: event.title,
    date: event.start,
    startTime: event.start,
    endTime: event.end,
    type: event.isACourse ? 1 : 0,
    daysOfWeek: event.daysOfWeek,
    isRecurrent: event.daysOfWeek && event.daysOfWeek.length > 0,
    address: event.address,
    speakers: event.speakers.map((speaker) => ({
      id: speaker.id,
      label: fullName(speaker),
    })),
    description: event.description,
  };

  return (
    <Grid container spacing={2} margin={4}>
      {!event ? (
        "No hay evento registrado"
      ) : (
        <>
          <Grid xs={12}>
            <Box>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="Eliminar">
                  <Fab aria-labelledby="delete">
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </div>
              <EventForm
                locId={locId}
                initialValues={initialValues}
                submit={() => console.log("Hola")}
              />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" gutterBottom>
              Toma de asistencia
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2}>
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
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Button
              type="submit"
              variant="contained"
              onClick={async () => {
                const api = await getApi();
                await api.put(`/events/${id}/attendance`, {
                  personIds: rowSelectionModel,
                });
                alert.showMessage("Asistencia guardada exitosamente");
              }}
            >
              Registrar asistencias
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
