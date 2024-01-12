"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { OrganizationForm } from "../../../(components)/OrganizationForm";
import useSWR from "swr";
import { OrganizationDetail } from "../Organization";
import { api } from "@builder.io/react/dist/types/src/functions/string-to-function";
import Loading from "@/app/(components)/Loading";

export default function Organization({
  params,
}: {
  params: { orgId: number };
}) {
  const { orgId } = params;

  const { data: organization, isLoading } = useSWR<OrganizationDetail>(
    `/organizations/${orgId}`
  );

  if (isLoading) return <Loading/>;

  return (
    <Box>
      {!organization ? (
        <div>no existe tal organizacion</div>
      ) : (
        <OrganizationForm
          initialValues={organization}
          title="Datos generales de la organización"
          submit={async () => await console.log("Click =D")}
        />
      )}
    </Box>
  );
}
