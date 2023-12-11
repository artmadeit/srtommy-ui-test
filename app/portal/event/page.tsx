import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";

export default function EventListPage() {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Lista de eventos</Typography>
        <Tooltip title="Registrar">
          <Link href="event/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      {/* <TextField
        placeholder="Buscar..."
        variant="outlined"
        value={searchText}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
      /> */}
    </Stack>
  );
}
