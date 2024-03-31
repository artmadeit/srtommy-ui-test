"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import MenuDrawer2 from "../../MenuDrawer2";
import { LocationForm } from "@/app/(components)/LocationForm";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { ORG_ID } from "./constants";

export default function LocationCreatePage() {
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  const submit = async (data: any) => {
    const api = await getApi();
    const response = await api.post("organizations/locations", {
      ...data,
      parentId: ORG_ID,
    });
    alert.showMessage("Guardado exitosamente");
    router.push("/portal/" + response.data.id);
  };

  return (
    <MenuDrawer2>
      <LocationForm
        initialValues={{
          name: "",
          address: "",
          phoneNumber: "+51",
        }}
        title="Registrar Datos de la Sede"
        submit={submit}
      />
    </MenuDrawer2>
  );
}
