import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function PersonListPage() {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Asistencias</Typography>
        <Tooltip title="Crear persona">
          <Link href="/portal/person/create">
            <Fab color="primary" aria-labelledby="create">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
