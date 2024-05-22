"use client";

import { useAuthApi } from "@/app/(api)/api";
import { formatDateTime } from "@/app/(api)/date";
import Loading from "@/app/(components)/Loading";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { PersonTable, fullName } from "../../../person/PersonTable";
import { EventDetail } from "../EventDetail";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { EventForm, EventFormValues } from "@/app/(components)/EventForm";

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
    // speakers: event.speakers.map((x)=> x.firstName),
    description: event.description,
  };

  return (
    <Grid container spacing={2} margin={4}>
      {!event ? (
        "No hay evento registrado"
      ) : (
        <>
          <Grid xs={12}>
            <Box display="flex" alignItems="center">
              <EventForm
                locId={locId}
                initialValues={initialValues}
                submit={() => console.log("Hola")}
              />
              {/* <Typography variant="h5" gutterBottom>
                {event.title}
              </Typography>
              <Tooltip title="Editar">
                <Link href={`/portal/${locId}/event/${id}`}>
                  <IconButton aria-label="edit">
                    <EditIcon sx={{ marginBottom: "0.35em" }} />
                  </IconButton>
                </Link>
              </Tooltip> */}
            </Box>
            {/* <Box>
              <Typography>
                Fecha Inicio: {formatDateTime(event.start)}
              </Typography>
              <Typography>Fecha Fin: {formatDateTime(event.end)}</Typography>
            </Box> */}
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
