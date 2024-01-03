"use client";

import React, { useState } from "react";
import {
  Fab,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  DataGridProps,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { SpringPage } from "@/app/(api)/pagination";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import useSWR from "swr";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { DEBOUNCE_WAIT_MS } from "@/app/(components)/helpers/debouncing";
import { useRouter } from "next/navigation";

type PersonListItem = {
  id: number;
  name: string;
};

export default function PersonListPage() {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Personas</Typography>
        <Tooltip title="Crear persona">
          <Link href="person/create">
            <Fab color="primary" aria-labelledby="create">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <PersonTable />
    </Stack>
  );
}

export type MyDataGridProps = Omit<DataGridProps, "columns" | "rows">;

export const PersonTable = ({
  dataGridProps = {},
}: {
  dataGridProps?: MyDataGridProps;
}, ) => {
  const { paginationModel, setPaginationModel } = usePagination();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_WAIT_MS);
  const { data: people, isLoading } = useSWR<SpringPage<PersonListItem>>(
    searchTextDebounced ? `people?searchText=${searchTextDebounced}` : `people`
  );

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "fullName", headerName: "Nombre", flex: 1 },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => {
              return [
                <Tooltip title="Ver" key="see">
                  <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="Ver"
                    onClick={() => router.push(`/portal/1/person/${params.id}`)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<PersonListItem>[]
      ).map(withOutSorting),
    []
  );

  return (
    <>
      <TextField
        placeholder="Buscar"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          loading={isLoading}
          columns={columns}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableColumnFilter
          rows={people?.content || []}
          rowCount={people?.totalElements || 0}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          {...dataGridProps}
        />
      </div>
    </>
  );
};
