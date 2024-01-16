"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { OrganizationForm } from "../../../(components)/OrganizationForm";
import useSWR from "swr";
import { OrganizationDetail } from "../Organization";
import { api } from "@builder.io/react/dist/types/src/functions/string-to-function";
import Loading from "@/app/(components)/Loading";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";

export default function Organization({
  params,
}: {
  params: { orgId: number };
}) {
  const { orgId } = params;

  const { data: organization, isLoading } = useSWR<OrganizationDetail>(
    `/organizations/${orgId}`
  );

  // const getApi = useAuthApi();
  // const alert = React.useContext(SnackbarContext);
  // const router = useRouter();   

  if (isLoading) return <Loading/>;

  return (
    <Box>
      {!organization ? (
        <div>no existe tal organizacion</div>
      ) : (
        <OrganizationForm
          initialValues={organization}
          title="Datos generales de la organización"
          submit={async(values)=> console.log(values)}
        />
      )}
    </Box>
  );
}
