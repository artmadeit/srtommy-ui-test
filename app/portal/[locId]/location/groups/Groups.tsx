"use client";

import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import React from "react";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { GroupTypeLabels } from "./Group";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogDeleteConfirmation } from "@/app/(components)/DialogDeleteConfirmation";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { pink } from "@mui/material/colors";
import { RegisterButton } from "@/app/(components)/RegisterButton";

type GroupsProps = {
  locId: number;
};

type GroupListItem = {
  id: number;
  name: string;
  type: "GROUP" | "MINISTRY";
};

export function Groups({ locId }: GroupsProps) {
  const [groupToDeleteId, setGroupToDeleteId] = React.useState<number | null>(
    null,
  );
  const router = useRouter();

  const {
    data: groups,
    isLoading,
    mutate,
  } = useSWR(`/organizations/${locId}/childs`);
  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);

  const deleteGroup = async (id: number | null) => {
    if (!id) return;
    await getApi().then((api) => api.delete(`/organizations/${id}`));
    setGroupToDeleteId(null);
    alert.showMessage("Eliminado exitosamente");
    mutate();
  };

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre", flex: 1 },
          {
            field: "type",
            headerName: "Tipo",
            flex: 1,
            valueGetter: (value) =>
              value === "GROUP"
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
                    icon={<DeleteIcon sx={{ color: pink[500] }} />}
                    onClick={() => setGroupToDeleteId(params.row.id)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<GroupListItem>[]
      ).map(withOutSorting),
    [router],
  );

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6">Grupos y Ministerios</Typography>
        <Tooltip title="Registrar">
          <Link href="location/groups/create">
            <RegisterButton />
            {/* <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab> */}
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
        open={groupToDeleteId !== null}
        close={() => setGroupToDeleteId(null)}
        onDelete={() => deleteGroup(groupToDeleteId)}
      />
    </Stack>
  );
}
