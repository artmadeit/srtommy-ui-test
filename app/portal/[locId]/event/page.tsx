"use client";

import { useAuthApi } from "@/app/(api)/api";
import { EventForm } from "@/app/(components)/EventForm";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Calendar, { DatesSelection } from "./Calendar";
import { format } from "date-fns";

export default function EventListPage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  const getApi = useAuthApi();
  const alert = useContext(SnackbarContext);

  const [spanSelected, setSpanSelected] = useState<DatesSelection>();

  const close = () => setSpanSelected(undefined);

  return (
    <Stack direction="column" spacing={2} p={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">Eventos y cursos</Typography>
      </Stack>
      <Calendar
        organizationId={locId}
        onSelect={(x) => {
          setSpanSelected(x);
        }}
      />
      <Dialog open={Boolean(spanSelected)}>
        <IconButton
          onClick={close}
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
            type: 0,
            speakers: [],
          }}
          submit={async (values) => {
            if (!values.startTime) {
              return;
            }

            if (!values.date) {
              return;
            }

            if (!values.endTime) {
              return;
            }

            if (values.isRecurrent && !values.endRecur) {
              return;
            }

            const data = {
              name: values.name,
              address: values.address,
              organizationId: locId,
              startTime: format(values.startTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
              endTime:  format(values.endTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
              endRecur: values.endRecur,
              speakerIds: values.speakers.map((x) => x.id),
              description: values.description,
              daysOfWeek: values.daysOfWeek,
              isACourse: values.type === 1,
            };

            await getApi().then((api) => api.post(`/events`, data));
            close();
            alert.showMessage("Guardado exitosamente");
          }}
          editable={true}
        />
      </Dialog>
    </Stack>
  );
}
