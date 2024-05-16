"use client";

import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import Calendar, { DatesSelection } from "./Calendar";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useContext, useState } from "react";
import { EventForm } from "@/app/(components)/EventForm";
import CloseIcon from "@mui/icons-material/Close";

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
  const [spanSelected, setSpanSelected] = useState<DatesSelection>();

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Eventos y cursos</Typography>
      </Stack>
      <Calendar
        onSelect={(x) => {
          setSpanSelected(x);
        }}
      />
      <Dialog open={Boolean(spanSelected)}>
        <IconButton
          onClick={() => setSpanSelected(undefined)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <EventForm
          locId={locId}
          initialValues={{
            name: "",
            date: spanSelected?.start,
            startTime: spanSelected?.start,
            endTime: spanSelected?.end,
            address: "",
            description: "",
            isRecurrent: false,
            daysOfWeek: [],
            speakers: [],
          }}
          submit={async (values) => {
            console.log(values);
            // if (!values.startTime) {
            //   return;
            // }

            // if (!values.date) {
            //   return;
            // }

            // if (!values.endTime) {
            //   return;
            // }

            // const data = {
            //   name: values.name,
            //   address: values.address,
            //   organizationId: locId,
            //   startTime: getDateTime(values.date, values.startTime),
            //   endTime: getDateTime(values.date, values.endTime),
            //   speakerIds: values.speakers.map((x) => x.id),
            //   description: values.description,
            // };

            // const response = await getApi().then((api) =>
            //   api.post(`/events`, data)
            // );
            // alert.showMessage("Guardado exitosamente");
          }}
        />
      </Dialog>
    </Stack>
  );
}
