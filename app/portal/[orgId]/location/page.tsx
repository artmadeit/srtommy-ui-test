"use client";

import { Box } from "@mui/material";
import React from "react";
import { LocationForm } from "../../../(components)/LocationForm";
import useSWR from "swr";
import { LocationDetail } from "../Location";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function Location({
  params,
}: {
  params: { orgId: number };
}) {
  const { orgId } = params;

  const { data: organization, isLoading } = useSWR<LocationDetail>(
    `/organizations/${orgId}`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);

  if (isLoading) return <Loading />;

  return (
    <Box>
      {!organization ? (
        <div>no existe tal organizacion</div>
      ) : (
        <LocationForm
          initialValues={organization}
          title="Datos generales de la sede"
          submit={async (formValues) => {
            const api = await getApi();
            await api.put(`/organizations/${orgId}`, {
              name: formValues.name,
              address: formValues.address,
              phoneNumber: formValues.phoneNumber,
            });
            alert.showMessage("Guardado exitosamente");
          }}
        />
      )}
    </Box>
  );
}
