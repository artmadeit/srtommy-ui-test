"use client";

import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import React from "react";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { useRouter } from "next/navigation";
import useSWR from "swr";

type GroupsProps = {
  locId: number;
};

type GroupListItem = {
  id: number;
  name: string;
  type: string;
};

export function Groups({ locId }: GroupsProps) {
  const router = useRouter();

  const { data: groups, isLoading } = useSWR(`/organizations/${locId}/childs`);

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre" },
          { field: "type", headerName: "Tipo" },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => {
              return [
                <Tooltip title="Editar" key="see">
                  <GridActionsCellItem
                    label="Ver"
                    icon={<SearchIcon />}
                    onClick={() =>
                      router.push(`event/${params.row.id}/attendance`)
                    }
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
          <Link href="/">
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
          // rowCount={}
        />
      </div>
    </Stack>
  );
}
