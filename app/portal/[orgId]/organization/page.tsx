"use client";

import { Box } from "@mui/material";
import React from "react";
import { OrganizationForm } from "../../../(components)/OrganizationForm";
import useSWR from "swr";
import { OrganizationDetail } from "../Organization";

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

  if (isLoading) return <Loading />;

  return (
    <Box>
      {!organization ? (
        <div>no existe tal organizacion</div>
      ) : (
        <OrganizationForm
          initialValues={organization}
          title="Datos generales de la organización"
          submit={async (values) => console.log(values)}
        />
      )}
    </Box>
  );
}
