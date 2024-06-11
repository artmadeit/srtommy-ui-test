"use client";

import { useAuthApi } from "@/app/(api)/api";
import Loading from "@/app/(components)/Loading";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import {
  PersonForm,
  roleToOption,
} from "@/app/portal/[locId]/person/PersonForm";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { RolesLocation } from "../../location/page";
import { PersonDetail } from "../Person";

export default function PersonEdit({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const {
    data: person,
    mutate: mutatePerson,
    isLoading,
  } = useSWR<PersonDetail>(`/people/${id}`);

  const { data: roles, mutate: mutateRoles } = useSWR<RolesLocation[]>(
    `/organizations/locations/${locId}/person/${id}/roles`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);
  const router = useRouter();

  if (isLoading) return <Loading />;
  if (!roles) return <div>Not found</div>;

  return (
    <Box>
      {!person ? (
        <div>El usuario no ha esta registrado</div>
      ) : (
        <PersonForm
          initialValues={{
            ...person,
            hasBeenBaptized: person.hasBeenBaptized ? "YES" : "NO",
            roles: roles.map(roleToOption),
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
            mutatePerson();
            mutateRoles();
            alert.showMessage("Guardado exitosamente");
            router.push(`/portal/${locId}/person`);
          }}
          locId={locId}
        />
      )}
    </Box>
  );
}
