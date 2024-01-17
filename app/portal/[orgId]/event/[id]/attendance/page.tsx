"use client";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { PersonTable } from "../../../person/PersonTable";
import Link from "next/link";
import useSWR from "swr";
import { EventDetail } from "../page";
import { formatDateTime } from "@/app/(api)/date";

export default function AttendanceEvent({
  params,
}: {
  params: { id: number; orgId: number };
}) {
  const { id, orgId } = params;

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const { data: event } = useSWR<EventDetail>(`/events/${id}`);

  return (
    <Grid container spacing={2} padding={2}>
      {!event ? (
        "No hay evento registrado"
      ) : (
        <>
          <Grid xs={12} display="flex" alignItems="center">
            <Typography variant="h5" gutterBottom>
              {event.name}
            </Typography>
            <Typography sx={{ marginLeft: "10px" }}>
              Fecha: {formatDateTime(event.startTime)}
            </Typography>
            <Tooltip title="Editar">
              <Link href={`/portal/${orgId}/event/${id}`}>
                <IconButton aria-label="edit">
                  <EditIcon sx={{ marginBottom: "0.35em" }} />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" gutterBottom>
              Toma de asistencia
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2}>
              <PersonTable
                orgId={orgId}
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
              onClick={() => {
                console.log(rowSelectionModel);
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
