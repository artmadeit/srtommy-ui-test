"use client";

import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  esES,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { withOutSorting } from "@/app/(components)/helpers/withOutSorting";
import useSWR from "swr";
import { SpringPage } from "@/app/(api)/pagination";
import { usePagination } from "@/app/(components)/hook-customization/usePagination";

type CourseLisItem = {
  id: number;
  name: string;
};

export default function CourseListPage() {
  const router = useRouter();
  const { paginationModel, setPaginationModel } = usePagination();
  
  const { data: events, isLoading } =
    useSWR<SpringPage<CourseLisItem>>("/events");

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
                <Tooltip title="Ver" key="see">
                  <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="Ver"
                    onClick={() =>
                      router.push(`event/${params.row.id}/attendance`)
                    }
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<CourseLisItem>[]
      ).map(withOutSorting),
    [router]
  );

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Cursos</Typography>
        <Tooltip title="Registrar">
          <Link href="courses/create">
            <Fab color="primary" aria-labelledby="add">
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </Stack>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          loading={isLoading}
          columns={columns}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rows={events?.content || []}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Stack>
  );
}
