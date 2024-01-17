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
import { Page, SpringPage } from "@/app/(api)/pagination";
import useSWR from "swr";

type EventListItem = {
  id: number;
  name: string;
};

export default function EventListPage() {
  const router = useRouter();
  const { paginationModel, setPaginationModel } = usePagination();

  const eventList = [
    { id: 1, name: "Matrimonios Jovenes" }, // 11 de diciembre, no hora?
    { id: 2, name: "Servicio Dominical" }, // domingos, 10:00 am
    { id: 3, name: "Graduación grupo de mujeres" }, //
    { id: 4, name: "Viernes con Jesús" }, // 24 de noviembre, 7:30pm, jose mena
    { id: 5, name: "Reunión de hombres" }, // 28 de octubre, 7:30pm
    { id: 6, name: "Mujeres virtuosas" }, // miercoles a las 9:30am
    { id: 7, name: "Celebremos juntos el dia del niño" }, // domingo 20 de agosto 10am
    { id: 8, name: "Sobredosis Garden" }, // jueves 27-30 de agosto (ver: https://www.facebook.com/photo/?fbid=673593008144144&set=pcb.673593201477458)
  ];

  const { data: events2, isLoading } =
    useSWR<SpringPage<EventListItem[]>>("/events");

  const columns = useMemo(
    () =>
      (
        [
          { field: "name", flex: 1, headerName: "Nombre" },
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
                    onClick={() =>
                      router.push(`event/${params.row.id}/attendance`)
                    }
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
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableColumnFilter
          rows={events2?.content || []}
          rowCount={events2?.totalElements || 0}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}
