"use client";

import { PersonForm } from "@/app/portal/[locId]/person/PersonForm";
import useSWR from "swr";
import { PersonDetail } from "../Person";
import { Box } from "@mui/material";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";
import { RolesLocation } from "../../location/page";

export default function PersonEdit({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const {
    data: person,
    mutate,
    isLoading,
  } = useSWR<PersonDetail>(`/people/${id}`);

  const { data: roles } = useSWR<RolesLocation[]>(
    `/organizations/locations/${locId}/person/${id}/roles`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);
  const router = useRouter();

  if (isLoading) return <Loading />;
  if(!roles) return <div>Not found</div>

  return (
    <Box>
      {!person ? (
        <div>El usuario no ha esta registrado</div>
      ) : (
        <PersonForm
          initialValues={{
            ...person,
            hasBeenBaptized: person.hasBeenBaptized ? "YES" : "NO",
            roles: roles,
          }}
          submit={async (formValues) => {
            const api = await getApi();
            await api.put(`/people/${id}`, {
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              phoneNumber: formValues.phoneNumber,
              age: formValues.age,
              birthdate: formValues.birthdate,
              organizationId: locId,
              hasBeenBaptized: formValues.hasBeenBaptized === "YES",
              roles: formValues.roles.map((x) => x.id),
            });
            mutate();
            alert.showMessage("Guardado exitosamente");
            router.push(`/portal/${locId}/person`);
          }}
          locId={locId}
        />
      )}
    </Box>
  );
}
