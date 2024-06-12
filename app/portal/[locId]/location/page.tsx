"use client";

import { Box } from "@mui/material";
import React from "react";
import { LocationForm } from "./LocationForm";
import useSWR from "swr";
import { LocationDetail } from "../Location";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { Groups } from "./groups/Groups";
import { getFixedOptions } from "./Roles";

export type RolesLocation = {
  id: number;
  name: string;
  isPredefined: boolean;
};

export default function Location({ params }: { params: { locId: number } }) {
  const { locId } = params;

  const { data: location, isLoading } = useSWR<LocationDetail>(
    `/organizations/${locId}`
  );

  const { data: roles } = useSWR<RolesLocation[]>(
    `/organizations/locations/${locId}/roles`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);

  if (isLoading) return <Loading />;
  if (!location || !roles) return <div>Not found</div>;

  const fixedOptions: string[] = getFixedOptions(roles);

  const initialValues = {
    name: location.name,
    address: location.address,
    phoneNumber: location.phoneNumber,
    roles: [
      ...fixedOptions,
      ...roles.filter((x) => !x.isPredefined).map((x) => x.name),
    ],
  };

  return (
    <Box>
      {!location ? (
        <div>No existe tal organización</div>
      ) : (
        <>
          <LocationForm
            initialValues={initialValues}
            title="Datos generales de la sede"
            fixedOptions={fixedOptions}
            submit={async (formValues) => {
              const api = await getApi();
              await api.put(`/organizations/locations/${locId}`, {
                name: formValues.name,
                address: formValues.address,
                phoneNumber: formValues.phoneNumber,
                roles: formValues.roles.filter(
                  (role) => !fixedOptions.includes(role)
                ),
              });
              alert.showMessage("Guardado exitosamente");
            }}
          />
          <Groups locId={locId} />
        </>
      )}
    </Box>
  );
}
