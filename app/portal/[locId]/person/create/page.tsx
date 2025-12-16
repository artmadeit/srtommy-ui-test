"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { PersonForm } from "@/app/portal/[locId]/person/PersonForm";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { formatISO } from "date-fns";

export default function CreatePerson(props: {
  params: Promise<{ locId: number }>;
}) {
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);
  const params = React.use(props.params);
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
        const api = await getApi();
        await api.post("people", {
          ...data,
          birthdate: data.birthdate
            ? formatISO(data.birthdate, { representation: "date" })
            : null,
          hasBeenBaptized: data.hasBeenBaptized === "YES",
          organizationId: locId,
          roles: data.roles.map((x) => x.id),
        });
        alert.showMessage("Guardado exitosamente");
        router.push(`/portal/${locId}/person`);
      }}
      locId={locId}
    />
  );
}
