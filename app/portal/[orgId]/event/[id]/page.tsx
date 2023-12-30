import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { PersonTable } from "../../person/page";

export default function EventDetailPage() {
  const event = {
    name: "Reunión de hombres diciembre",
    startTime: "15 de diciembre 2023 - 14:00",
    endTime: "15 de diciembre 2023 - 18:00",
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid xs={12}>
        <Typography variant="h3" gutterBottom>
          {event.name}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h6" gutterBottom>
          Toma de asistencia
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Stack spacing={2}>
          <PersonTable checkboxSelection />
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Button type="submit" variant="contained">
          Registrar asistencia
        </Button>
      </Grid>
    </Grid>
  );
}
