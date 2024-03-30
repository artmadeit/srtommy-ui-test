import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

export function Groups() {
  // const columns = React.useMemo(
  // 	() =>
  // 	(
  // 		[
  // 			{field: "", headername: ""},
  // 			{
  // 				field: "actions",
  // 				type: "actions",
  // 				width: 80,
  // 				getAction:(params)=> {
  // 					return [
  // 						<GridActionsCellItem

  // 						/>
  // 					]
  // 				}
  // 			}
  // 		]
  // 	)
  // )

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6">Grupos y Ministerios</Typography>
        <Tooltip title="Registrar">
          <Link href="/">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      {/* <div>
        <DataGrid columns={} rows={} />
      </div> */}
    </Stack>
  );
}
