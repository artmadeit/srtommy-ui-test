"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { EventForm, EventFormValues } from "@/app/(components)/EventForm";
import useSWR from "swr";
import { PersonDetail } from "../../person/Person";

type EventDetail = {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  address: string;
  description: string;
  speakers: PersonDetail[];
};

export default function EventDetailPage({
  params,
}: {
  params: { id: number; orgId: number };
}) {
  const { id, orgId } = params;

  // const [rowSelectionModel, setRowSelectionModel] =
  //   useState<GridRowSelectionModel>([]);

  // const event = {
  //   name: "Reunión de hombres diciembre",
  //   startTime: "15 de diciembre 2023 - 14:00",
  //   endTime: "15 de diciembre 2023 - 18:00",
  // };

  const { data: event, isLoading } = useSWR<EventDetail>(`/events/${id}`);

  if (isLoading) return <div>Loading...</div>;

  if (!event) return <div>Not found</div>;

  const initialValues: EventFormValues = {
    name: event.name,
    address: event.address,
    description: event.description,
    startDate: event.startTime,
    startTime: event.startTime,
    endDate: event.endTime,
    endTime: event.endTime,
    speakers: [],
  };

  return (
    <Box>
      <EventForm
        orgId={orgId}
        initialValues={initialValues}
        submit={() => console.log("Enviar")}
      />
    </Box>
  );
}
