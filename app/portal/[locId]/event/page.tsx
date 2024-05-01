"use client";

import { Dialog, Stack, Typography } from "@mui/material";
import Calendar from "./Calendar";

import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useContext, useState } from "react";
import { EventForm } from "@/app/(components)/EventForm";

type EventListItem = {
  id: number;
  name: string;
};

export default function EventListPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  const getApi = useAuthApi();
  const alert = useContext(SnackbarContext);

  function getDateTime(date: Date, time: Date) {
    return `${date.toISOString().split("T")[0]}T${
      time.toISOString().split("T")[1]
    }`;
  }

  const [open, setOpen] = useState(false);

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Eventos</Typography>
      </Stack>
      <Calendar
        onSelect={(x) => {
          setOpen(true);
        }}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <EventForm
          locId={locId}
          initialValues={{
            name: "",
            startTime: null,
            endTime: null,
            address: "",
            description: "",
            speakers: [],
          }}
          submit={async (values) => {
            if (!values.startDate) {
              return;
            }

            if (!values.startTime) {
              return;
            }

            if (!values.endDate) {
              return;
            }

            if (!values.endTime) {
              return;
            }

            const data = {
              name: values.name,
              address: values.address,
              organizationId: locId,
              startTime: getDateTime(values.startDate, values.startTime),
              endTime: getDateTime(values.endDate, values.endTime),
              speakerIds: values.speakers.map((x) => x.id),
              description: values.description,
            };

            const response = await getApi().then((api) =>
              api.post(`/events`, data)
            );
            alert.showMessage("Guardado exitosamente");
          }}
        />
      </Dialog>
    </Stack>
  );
}
