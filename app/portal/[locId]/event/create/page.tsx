"use client";
import { Box } from "@mui/material";
import React from "react";
import { useAuthApi } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { EventForm } from "@/app/(components)/EventForm";

export default function EventCreatePage({
  params,
}: {
  params: { locId: number };
}) {
  const { locId } = params;

  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  function getDateTime(date: Date, time: Date) {
    return `${date.toISOString().split("T")[0]}T${
      time.toISOString().split("T")[1]
    }`;
  }

  return (
    <Box>
      <EventForm
        locId={locId}
        initialValues={{
          name: "",
          // startDate: null,
          startTime: null,
          // endDate: null,
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
          router.push(`/portal/${locId}/event`);
        }}
      />
    </Box>
  );
}
