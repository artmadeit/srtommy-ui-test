"use client";

import React from "react";
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
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { Page } from "@/app/(api)/pagination";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";

type PersonListItem = {
  id: number;
  name: string;
};

export default function PersonListPage() {
  const { paginationModel, setPaginationModel } = usePagination();

  const personList = [
    { id: 1, name: "Daniel" },
    { id: 2, name: "Michel" },
    { id: 3, name: "jhonny" },
    { id: 4, name: "Rosa" },
  ];

  const people: Page<PersonListItem> = {
    _embedded: {
      people: personList,
    },
    _links: {},
    page: {
      size: personList.length,
      totalElements: personList.length,
      totalPages: 1,
      number: personList.length,
    },
  };

  const isLoading = false;

  const columns = React.useMemo(
    () =>
      (
        [
          { field: "name", headerName: "Nombre" },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => {
              return [
                <Tooltip title="Ver" key="see">
                  <GridActionsCellItem icon={<SearchIcon />} label="Ver" />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<PersonListItem>[]
      ).map(withOutSorting),
    []
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Personas</Typography>
        <Tooltip title="Crear persona">
          <Link href="/portal/person/create">
            <Fab color="primary" aria-labelledby="create">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
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
      />
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          loading={isLoading}
          columns={columns}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          // checkboxSelection TODO: move this to meeting attendance
          disableColumnFilter
          rows={people?._embedded.people || []}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}
