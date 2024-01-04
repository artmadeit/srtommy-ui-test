"use client";

import { PersonForm } from "@/app/(components)/PersonForm";
import useSWR from "swr";
import { PersonDetail } from "../Person";
import { Box } from "@mui/material";

export default function PersonEdit({
  params,
}: {
  params: { id: number; orgId: number };
}) {
  const { id, orgId } = params;

  const { data: person, isLoading } = useSWR<PersonDetail>(`/people/${id}`);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      {!person ? (
        <div>El usuario no ha esta registrado</div>
      ) : (
        <PersonForm
          initialValues={person}
          submit={async () => await console.log("Click =D")}
        />
      )}
    </Box>
  );
}
