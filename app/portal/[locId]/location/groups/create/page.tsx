"use client";

import React from "react";
import { GroupForm } from "@/app/(components)/GroupForm";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function GroupCreatePage({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  return (
    <GroupForm
      initialValues={{
        name: "",
        description: "",
        type: "GROUP",
      }}
      submit={async (data) => {
        const api = await getApi();
        await api.post("/organizations/locations/childs", {
          ...data,
          parentId: locId,
        });
        alert.showMessage("Guardado exitosamente");
      }}
    />
  );
}
