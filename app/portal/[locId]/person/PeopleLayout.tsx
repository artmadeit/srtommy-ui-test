import { TableChart, TableRows } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Fab,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export function PeopleLayout({
  children,
  value,
}: {
  children: React.ReactNode;
  value: "table" | "board";
}) {
  return (
    <Stack direction="column" spacing={2} p={4}>
      <Box display="flex" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">Personas</Typography>
          <Tooltip title="Registrar">
            <Link href="person/create">
              <Fab color="primary" aria-labelledby="create">
                <AddIcon />
              </Fab>
            </Link>
          </Tooltip>
        </Stack>
        <ToggleButtonGroup value={value} exclusive aria-label="text alignment">
          <ToggleButton
            value="table"
            aria-label="table"
            LinkComponent={Link}
            href="person"
          >
            <TableRows />
          </ToggleButton>
          <ToggleButton
            value="board"
            aria-label="kanban board"
            LinkComponent={Link}
            href="person/board"
          >
            <TableChart />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {children}
    </Stack>
  );
}
