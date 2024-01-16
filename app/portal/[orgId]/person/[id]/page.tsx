"use client";

import { PersonForm } from "@/app/(components)/PersonForm";
import useSWR from "swr";
import { PersonDetail } from "../Person";
import { Box } from "@mui/material";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";

export default function PersonEdit({
  params,
}: {
  params: { id: number; orgId: number };
}) {
  const { id, orgId } = params;

  const {
    data: person,
    mutate,
    isLoading,
  } = useSWR<PersonDetail>(`/people/${id}`);

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);
  const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <Box>
      {!person ? (
        <div>El usuario no ha esta registrado</div>
      ) : (
        <PersonForm
          initialValues={person}
          submit={async (formValues) => {
            console.log(formValues);
            const api = await getApi();
            await api.put(`/people/${id}`, {
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              phoneNumber: formValues.phoneNumber,
              age: formValues.age,
              birthdate: formValues.birthdate,
              organizationId: orgId,
            });
            mutate();
            alert.showMessage("Usuario editado");
            router.push(`/portal/${orgId}/person`);
          }}
        />
      )}
    </Box>
  );
}
