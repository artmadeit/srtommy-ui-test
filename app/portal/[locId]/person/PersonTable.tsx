"use client";
import React, { useState } from "react";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
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
import { useDebounce } from "use-debounce";
import { DEBOUNCE_WAIT_MS } from "@/app/(components)/helpers/debouncing";
import { useRouter } from "next/navigation";
import { PersonListItem } from "./PersonListItem";
import { PersonDetailWithId } from "./Person";

export type MyDataGridProps = Omit<DataGridProps, "columns" | "rows">;

export type PersonTableProps = {
  dataGridProps?: MyDataGridProps;
  locId: number;
};

export const PersonTable = ({
  dataGridProps = {},
  locId,
}: PersonTableProps) => {
  const { paginationModel, setPaginationModel } = usePagination();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounced] = useDebounce(searchText, DEBOUNCE_WAIT_MS);
  const { data: people, isLoading } = useSWR<SpringPage<PersonListItem>>([
    `people`,
    {
      params: {
        organizationId: locId,
        page: paginationModel.page,
        size: paginationModel.pageSize,
        ...(searchTextDebounced ? { searchText: searchTextDebounced } : {}),
      },
    },
  ]);

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
                    onClick={() =>
                      router.push(`/portal/${locId}/person/${params.id}`)
                    }
                  />
                </Tooltip>,
              ];
            },
          },
        ] as GridColDef<PersonListItem>[]
      ).map(withOutSorting),
    [router, locId]
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

export const fullName = (person: PersonDetailWithId) => {
  return person.firstName + " " + person.lastName;
};
