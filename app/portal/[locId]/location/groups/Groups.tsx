"use client";

import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,

} from "@mui/x-data-grid";
import {esES} from "@mui/x-data-grid/locales";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import React from "react";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { GroupTypeLabels } from "./Group";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogDeleteConfirmation } from "@/app/(components)/DialogDeleteConfirmation";

type GroupsProps = {
  locId: number;
};

type GroupListItem = {
  id: number;
  name: string;
  type: "GROUP" | "MINISTRY";
};

export function Groups({ locId }: GroupsProps) {
  const [openDDelete, setOpenDDelete] = React.useState(false);
  const router = useRouter();

  const { data: groups, isLoading } = useSWR(`/organizations/${locId}/childs`);

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre", flex: 1 },
          {
            field: "type",
            headerName: "Tipo",
            flex: 1,
            valueGetter: ({ row }) =>
              row.type === "GROUP"
                ? GroupTypeLabels.GROUP
                : GroupTypeLabels.MINISTRY,
          },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => {
              return [
                <Tooltip title="Ver / editar" key="see">
                  <GridActionsCellItem
                    label="Ver"
                    icon={<SearchIcon />}
                    onClick={() =>
                      router.push(`location/groups/${params.row.id}`)
                    }
                  />
                </Tooltip>,
                <Tooltip title="Eliminar" key="delete">
                  <GridActionsCellItem
                    label="Eliminar"
                    icon={<DeleteIcon />}
                    onClick={() => setOpenDDelete(true)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<GroupListItem>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6">Grupos y Ministerios</Typography>
        <Tooltip title="Registrar">
          <Link href="location/groups/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div style={{ width: "100%", height: "70vh" }}>
        <DataGrid
          loading={isLoading}
          columns={columns}
          rows={groups || []}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
      <DialogDeleteConfirmation
        open={openDDelete}
        close={() => setOpenDDelete(false)}
        onDelete={() => console.log("Eliminando =D")}
      />
    </Stack>
  );
}
