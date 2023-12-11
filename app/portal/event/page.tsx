"use client";
import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";
import { Page } from "@/app/(api)/pagination";

type EventListItem = {
  id: number;
  name: string;
};

export default function EventListPage() {
  const router = useRouter();
  const { paginationModel, setPaginationModel } = usePagination();

  const isLoading = false;
  const events: Page<EventListItem> = {
    _embedded: {
      events: [],
    },
    _links: {},
    page: {
      size: 1,
      totalElements: 0,
      totalPages: 1,
      number: 1,
    },
  };

  const columns = useMemo(
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
                <Tooltip title="Ver" key="edit">
                  <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="ver"
                    onClick={() => router.push(`events/${params.row.id}`)}
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<EventListItem>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Eventos</Typography>
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
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          loading={isLoading}
          columns={columns}
          rowCount={events?.page.totalElements || 0}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableColumnFilter
          rows={events?._embedded.patients || []}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}
