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
  params: { orgId: number };
}) {
  const { orgId } = params;

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
        orgId={orgId}
        initialValues={{
          name: "",
          // startDate: null,
          // startTime: null,
          // endDate: null,
          // endTime: null,
          address: "",
          description: "",
          speakers: [],
        }}
        submit={async (values) => {
          // const { startDate, endDate, startTime, endTime,
          //    ...rest} = values;
          const data = {
            name: values.name,
            address: values.address,
            organizationId: orgId,
            startTime: getDateTime(values.startDate, values.startTime),
            endTime: getDateTime(values.endDate, values.endTime),
            speakerIds: values.speakers.map((x) => x.id),
            description: values.description,
          };

          const response = await getApi().then((api) =>
            api.post(`/events`, data)
          );
          alert.showMessage("Evento registrado exitosamente");
          router.push(`/portal/${orgId}/event`);
          // console.log(values.speakers);
          // console.log(data)
        }}
      />
    </Box>
  );
}
