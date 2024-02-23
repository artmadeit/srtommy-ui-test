"use client";

import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { PersonTable } from "./PersonTable";

export default function PersonListPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  return (
    <Stack direction="column" spacing={2}>
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
      <PersonTable locId={locId} />
    </Stack>
  );
}
