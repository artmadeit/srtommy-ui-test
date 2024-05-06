"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { PersonForm } from "@/app/portal/[locId]/person/PersonForm";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function CreatePerson({
  params,
}: {
  params: { locId: number };
}) {
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);
  const { locId } = params;

  return (
    <PersonForm
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "+51",
        roles: [],
      }}
      submit={async (data) => {
        console.log(data)
        const api = await getApi();
        await api.post("people", {
          ...data,
          hasBeenBaptized: data.hasBeenBaptized === "YES",
          organizationId: locId,
          roles: data.roles.map((x)=> x.id)
          // TODO: check roles here
        });
        alert.showMessage("Guardado exitosamente");
        router.push(`/portal/${locId}/person`);
      }}
      locId={locId}
    />
  );
}
