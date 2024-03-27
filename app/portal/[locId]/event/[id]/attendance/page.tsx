"use client";

import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { PersonTable } from "../../../person/PersonTable";
import Link from "next/link";
import useSWR from "swr";
import { EventDetail } from "../EventDetail";
import { formatDateTime } from "@/app/(api)/date";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";
import Loading from "@/app/(components)/Loading";

export default function AttendanceEvent({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const getApi = useAuthApi();
  // const router = useRouter();
  // const alert = React.useContext(SnackbarContext);

  const { data: event } = useSWR<EventDetail>(`/events/${id}`);
  const { data: attendances, isLoading } = useSWR<number[]>(
    `/events/${id}/attendance`
  );

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (attendances) {
      setRowSelectionModel(attendances);
    }
  }, [attendances]);

  if (isLoading) return <Loading />;

  return (
    <Grid container spacing={2} padding={2}>
      {!event ? (
        "No hay evento registrado"
      ) : (
        <>
          <Grid xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" gutterBottom>
                {event.name}
              </Typography>
              <Tooltip title="Editar">
                <Link href={`/portal/${locId}/event/${id}`}>
                  <IconButton aria-label="edit">
                    <EditIcon sx={{ marginBottom: "0.35em" }} />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
            <Box>
              <Typography>
                Fecha Inicio: {formatDateTime(event.startTime)}
              </Typography>
              <Typography>
                Fecha Fin: {formatDateTime(event.endTime)}
              </Typography>
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
              }}
            >
              Registrar asistencia
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
