"use client";

import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import MenuDrawer2 from "../../MenuDrawer2";
import {
  LocationForm,
  LocationFormValues,
} from "../../[locId]/location/LocationForm";
import React from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { ORG_ID } from "./constants";
import { getFixedOptions } from "../../[locId]/location/Roles";
import useSWR from "swr";
import { RolesLocation } from "../../[locId]/location/page";

export default function LocationCreatePage() {
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  const { data: roles } = useSWR<RolesLocation[]>(
    `/organizations/locations/predefined-roles`
  );

  if (!roles) return <div>Not found</div>;

  const fixedOptions: string[] = getFixedOptions(roles);

  const submit = async (data: LocationFormValues) => {
    const api = await getApi();
    const response = await api.post("organizations/locations", {
      ...data,
      parentId: ORG_ID,
      // TODO: andre
      roles: data.roles.filter((role) => !fixedOptions.includes(role)),
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
          roles: fixedOptions,
        }}
        fixedOptions={fixedOptions}
        title="Registrar Datos de la Sede"
        submit={submit}
      />
    </MenuDrawer2>
  );
}
