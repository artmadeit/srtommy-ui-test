"use client";

import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import MenuDrawer2 from "../../MenuDrawer2";
import {
  LocationForm,
  LocationFormValues,
} from "../../[locId]/location/LocationForm";
import { getFixedOptions } from "../../[locId]/location/Roles";
import { RolesLocation } from "../../[locId]/location/page";
import { useAuth0 } from "@auth0/auth0-react";

export default function LocationCreatePage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);
  const { user } = useAuth0();

  const { data: roles } = useSWR<RolesLocation[]>(
    `/organizations/locations/predefined-roles`
  );

  if(!user) return <div>User must be logged in</div>
  if (!roles) return <div>Not found</div>;

  const fixedOptions: string[] = getFixedOptions(roles);

  const submit = async (data: LocationFormValues) => {
    const api = await getApi();
    const response = await api.post("organizations/locations", {
      ...data,
      parentId: user["https://sr-tommy.com/orgId"],
      roles: data.roles.filter((role) => !fixedOptions.includes(role)),
    });
    alert.showMessage("Guardado exitosamente");
    router.push("/portal/" + response.data.id);
  };

  return (
    <MenuDrawer2 locId={locId}>
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
