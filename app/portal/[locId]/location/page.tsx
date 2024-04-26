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

type RolesLocation = {
  name: string;
  predefined: boolean;
};

export default function Location({ params }: { params: { locId: number } }) {
  const { locId } = params;

  const { data: location, isLoading } = useSWR<LocationDetail>(
    `/organizations/${locId}`
  );
  // TODO: call get organizations/locations/{id}/roles
  const { data: roles } = useSWR<RolesLocation[]>(
    `/organizations/locations/${locId}/roles`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);

  if (isLoading) return <Loading />;
  if (!location || !roles) return <div>Not found</div>;

  const toSpanish = (x: string) => {
    if (x === "PASTOR") {
      return "pastor";
    } else if (x === "WORSHIP_LEADER") {
      return "líder de alabanza";
    } else {
      return "ujier";
    }
  };

  const fixedOptions = roles
    .filter((x) => x.predefined === true)
    .map((x) => toSpanish(x.name));

  const initialValues = {
    name: location.name,
    address: location.address,
    phoneNumber: location.phoneNumber,
    roles: [...fixedOptions],
  };

  return (
    <Box>
      {!location ? (
        <div>no existe tal organizacion</div>
      ) : (
        <>
          <LocationForm
            initialValues={initialValues}
            title="Datos generales de la sede"
            fixedOptions={fixedOptions}
            submit={async (formValues) => {
              // const api = await getApi();
              // await api.put(`/organizations/locations/${locId}`, {
              //   name: formValues.name,
              //   address: formValues.address,
              //   phoneNumber: formValues.phoneNumber,
              //   roles: [],
              //   // roles: [], // TODO: andre
              // });
              console.log(formValues)
              alert.showMessage("Guardado exitosamente");
            }}
          />
          <Groups locId={locId} />
        </>
      )}
    </Box>
  );
}
