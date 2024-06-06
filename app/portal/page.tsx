import { Grid, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import MenuDrawer2 from "./MenuDrawer2";
import tommyImage from "./tomy.png";

export default function PortalHome({ params }: { params: { locId: number } }) {
  const { locId } = params;

  return (
    <main style={{ margin: "24px" }}>
      <MenuDrawer2
        locId={locId}
        listDrawer={
          <List>
            <ListItem>
              {/* TODO: randomize versicles?*/}
              <blockquote>
                Mejores son dos que uno; porque tienen mejor paga de su trabajo.
                Porque si caen, el uno levantará a su compañero; pero ¡ay del
                solo! que cuando caiga, no habrá segundo que lo levante.
                <br />
                <br />
                <em>Eclesiastés 4:9-10 (Reina-Valera 1960)</em>
              </blockquote>
            </ListItem>
          </List>
        }
      >
        <Grid container>
          <Grid item xs={4}>
            <Image src={tommyImage} alt="Picture of the author" />
          </Grid>
          <Grid item xs={6} pt={4}>
            <Typography variant="h3" gutterBottom>
              Bienvenido
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Soy el sr. Tommy, sere su fiel ayudante, cree o seleccione una
              sede para empezar a administrar su iglesia
            </Typography>
          </Grid>
        </Grid>
      </MenuDrawer2>
    </main>
  );
}
