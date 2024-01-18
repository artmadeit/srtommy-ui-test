"use client";

import { Box } from "@mui/material";
import React from "react";
import { OrganizationForm } from "../../../(components)/OrganizationForm";
import useSWR from "swr";
import { OrganizationDetail } from "../Organization";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
// import { useRouter } from "next/navigation";

export default function Organization({
  params,
}: {
  params: { orgId: number };
}) {
  const { orgId } = params;

  const { data: organization, isLoading } = useSWR<OrganizationDetail>(
    `/organizations/${orgId}`
  );

  const getApi = useAuthApi();
  const alert = React.useContext(SnackbarContext);
  // const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <Box>
      {!organization ? (
        <div>no existe tal organizacion</div>
      ) : (
        <OrganizationForm
          initialValues={organization}
          title="Datos generales de la organización"
          submit={async (formValues) => {
            const api = await getApi();
            await api.put(`/organizations/${orgId}`, {
              name: formValues.name,
              address: formValues.address,
              phoneNumber: formValues.phoneNumber,
            });
            alert.showMessage("Se editó");
            // router.push("");
          }}
        />
      )}
    </Box>
  );
}
