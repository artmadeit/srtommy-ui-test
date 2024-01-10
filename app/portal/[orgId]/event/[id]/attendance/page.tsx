"use client";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { PersonTable } from "../../../person/PersonTable";
import Link from "next/link";

export default function AttendanceEvent({
  params,
}: {
  params: { id: number; orgId: number };
}) {
  const { id, orgId } = params;

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const event = {
    name: "Reunión de hombres diciembre",
    startTime: "15 de diciembre 2023 - 14:00",
    endTime: "15 de diciembre 2023 - 18:00",
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid xs={12} display="flex" alignItems="center">
        <Typography variant="h5" gutterBottom>
          {event.name}
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
    </Grid>
  );
}
