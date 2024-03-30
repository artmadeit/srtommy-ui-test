"use client";

import { Box } from "@mui/material";
import React from "react";
import { LocationForm } from "../../../(components)/LocationForm";
import useSWR from "swr";
import { LocationDetail } from "../Location";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { Groups } from "./groups/Groups";

export default function Location({ params }: { params: { locId: number } }) {
  const { locId } = params;

  const { data: Location, isLoading } = useSWR<LocationDetail>(
    `/organizations/${locId}`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);

  if (isLoading) return <Loading />;

  return (
    <Box>
      {!Location ? (
        <div>no existe tal organizacion</div>
      ) : (
        <>
          <LocationForm
            initialValues={Location}
            title="Datos generales de la sede"
            submit={async (formValues) => {
              const api = await getApi();
              await api.put(`/organizations/${locId}`, {
                name: formValues.name,
                address: formValues.address,
                phoneNumber: formValues.phoneNumber,
              });
              alert.showMessage("Guardado exitosamente");
            }}
          />
          <Groups />
        </>
      )}
    </Box>
  );
}
