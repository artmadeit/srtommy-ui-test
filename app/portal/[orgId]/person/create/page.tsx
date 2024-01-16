"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { PersonForm } from "@/app/(components)/PersonForm";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function CreatePerson({
  params,
}: {
  params: { orgId: number };
}) {
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);
  const { orgId } = params;

  return (
    <PersonForm
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "+51",
      }}
      submit={async (data) => {
        const api = await getApi();
        await api.post("people", { ...data, organizationId: orgId });
        alert.showMessage("Persona registrada exitosamente");
        router.push(`/portal/${orgId}/person`);
      }}
    />
  );
}
