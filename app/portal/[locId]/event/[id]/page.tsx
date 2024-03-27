"use client";
import { Box } from "@mui/material";
import { EventForm, EventFormValues } from "@/app/(components)/EventForm";
import useSWR from "swr";
import Loading from "@/app/(components)/Loading";
import { EventDetail } from "./EventDetail";

export default function EventDetailPage({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const { data: event, isLoading } = useSWR<EventDetail>(`/events/${id}`);

  if (isLoading) return <Loading />;

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
        locId={locId}
        initialValues={initialValues}
        submit={() => console.log("Enviar")}
      />
    </Box>
  );
}
