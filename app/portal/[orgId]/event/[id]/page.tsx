"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function EventDetailPage({
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
    <Box>
      <Typography variant="h5">Editar evento</Typography>
    </Box>
  );
}
