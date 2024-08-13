import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import MenuDrawer2 from "./MenuDrawer2";
import tommyImage from "./tomy.png";
import ChurchIcon from "@mui/icons-material/Church";
import AddCardIcon from "@mui/icons-material/AddCard";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PortalHome({ params }: { params: { locId: number } }) {
  const { locId } = params;

  return (
    <main style={{ margin: "24px" }}>
      <Box>
        <MenuDrawer2
          locId={locId}
          listDrawer={
            <List>
              <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                <Image
                  src={tommyImage}
                  alt="Sr Tommy"
                  style={{ width: "100%", height: "100%" }}
                />
                <Typography gutterBottom>
                  Soy el sr. Tommy, seré su fiel ayudante, aquí el versiculo del
                  día:
                </Typography>
                {/* TODO: randomize versicles?*/}
                <blockquote style={{ margin: ".5rem" }}>
                  Mejores son dos que uno; porque tienen mejor paga de su
                  trabajo. Porque si caen, el uno levantará a su compañero; pero
                  ¡ay del solo! que cuando caiga, no habrá segundo que lo
                  levante.
                  <br />
                  <br />
                  <em>Eclesiastés 4:9-10 (Reina-Valera 1960)</em>
                </blockquote>
              </ListItem>
            </List>
          }
        >
          <Typography variant="h3" gutterBottom>
            Bienvenido
          </Typography>
          <p>
            Sigo los siguientes pasos para dar un gran salto en la
            administración de su iglesia
          </p>
          <Typography variant="h4" gutterBottom>
            Pasos
          </Typography>
          <Stack spacing={2}>
            <Paper sx={{ display: "flex", padding: 4 }}>
              <ChurchIcon fontSize="large" />
              <Box pl={2}>
                <Box pl={1}>
                  Registre su iglesia junto a sus sedes o solicite entrar a una
                </Box>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  LinkComponent={Link}
                  href="/church/register"
                >
                  Registrar iglesia
                </Button>
              </Box>
            </Paper>
            <Paper sx={{ display: "flex", padding: 4 }}>
              <AddCardIcon fontSize="large" />
              <Box pl={2}>
                <Box pl={1}>Suscríbase a un plan de pago</Box>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  LinkComponent={Link}
                  href="/payment/register"
                >
                  Subscribirse
                </Button>
              </Box>
            </Paper>
          </Stack>
        </MenuDrawer2>
      </Box>
    </main>
  );
}
