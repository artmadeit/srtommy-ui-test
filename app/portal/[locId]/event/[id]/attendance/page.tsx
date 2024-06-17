"use client";

import { useAuthApi } from "@/app/(api)/api";
import { EventForm, EventFormValues } from "@/app/(components)/EventForm";
import Loading from "@/app/(components)/Loading";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { FormContainer, RadioButtonGroup, useForm } from "react-hook-form-mui";
import useSWR from "swr";
import { PersonTable, fullName } from "../../../person/PersonTable";
import { EventDetail } from "../EventDetail";
import { DialogDeleteConfirmation } from "@/app/(components)/DialogDeleteConfirmation";
import { useRouter } from "next/navigation";

type EventAttendance = {
  numberOfVisitors: number;
  visitorsDescription: string;
  personIds: number[];
};

export default function AttendanceEvent({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const alert = useContext(SnackbarContext);
  const getApi = useAuthApi();
  const router = useRouter();

  const { data: event } = useSWR<EventDetail>(`/events/${id}`);
  const { data: eventAttendance, isLoading } = useSWR<EventAttendance>(
    `/events/${id}/attendance`
  );

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openDeleteDialog2, setOpenDeleteDialog2] = React.useState(false);
  // const [itemToDelete, setItemToDelete] = React.useState(null);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (eventAttendance) {
      setRowSelectionModel(eventAttendance.personIds);
    }
  }, [eventAttendance]);

  if (isLoading) return <Loading />;
  if (!event) return <div>Not found</div>;

  const recurrentEvent = event.recurrentEvent || event;
  const isRecurrent = Boolean(event.recurrentEvent);

  const deleteEvent = async () => {
    // if (itemToDelete === null) {
    //   return;
    // }

    await getApi().then((api) =>
      api.delete(`/events/${id}`, {
        data: {
          option: "THIS_EVENT",
        },
      })
    );
    alert.showMessage("Eliminado");
    router.push(`/portal/${locId}/event`);
    // setItemToDelete(null);
  };

  const initialValues: EventFormValues = {
    name: event.title,
    date: event.start,
    startTime: event.start,
    endTime: event.end,
    isRecurrent,
    daysOfWeek: isRecurrent ? recurrentEvent.daysOfWeek : [],
    endRecur: isRecurrent ? recurrentEvent.end : null,
    type: event.isACourse ? 1 : 0,
    address: event.address,
    speakers: event.speakers.map((speaker) => ({
      id: speaker.id,
      label: fullName(speaker),
    })),
    description: event.description,
  };

  return (
    <Grid container spacing={2} margin={4}>
      {!event ? (
        "No hay evento registrado"
      ) : (
        <>
          <Grid xs={12}>
            <Box>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="Eliminar">
                  <Fab
                    aria-labelledby="delete"
                    color="primary"
                    onClick={() =>
                      isRecurrent
                        ? setOpenDeleteDialog(true)
                        : setOpenDeleteDialog2(true)
                    }
                    // onClick={() => setOpenDeleteDialog(true)}
                  >
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </div>
              <EventForm
                locId={locId}
                initialValues={initialValues}
                submit={() => console.log("Hola")}
                editable={false}
              />
            </Box>
            {isRecurrent ? (
              <DialogDelete
                open={openDeleteDialog}
                close={() => setOpenDeleteDialog(false)}
                initialValues={{
                  option: "THIS_EVENT",
                }}
                onDelete={async () => {
                  await console.log("Eliminar");
                }}
              />
            ) : (
              <DialogDeleteConfirmation
                open={openDeleteDialog2}
                close={() => setOpenDeleteDialog2(false)}
                onDelete={deleteEvent}
              />
            )}
          </Grid>
          <Grid xs={12} display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Toma de asistencia
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Stack spacing={2}>
              <PersonTable
                locId={locId}
                dataGridProps={{
                  keepNonExistentRowsSelected: true,
                  checkboxSelection: true,
                  rowSelectionModel: rowSelectionModel,
                  onRowSelectionModelChange: (newSelectionModel) => {
                    setRowSelectionModel(newSelectionModel);
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Button
              type="submit"
              variant="contained"
              onClick={async () => {
                const api = await getApi();
                await api.put(`/events/${id}/attendance`, {
                  personIds: rowSelectionModel,
                });
                alert.showMessage("Asistencia guardada exitosamente");
              }}
            >
              Registrar asistencias
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}

type EventRecur = {
  option: "THIS_EVENT" | "THIS_AND_THE_FOLLOWING_EVENTS" | "ALL_EVENTS";
};

type DialogDeleteProps = {
  close: () => void;
  open: boolean;
  initialValues: EventRecur;
  onDelete: () => void;
};

const DialogDelete = ({
  close,
  open,
  onDelete,
  initialValues,
}: DialogDeleteProps) => {
  const formContext = useForm<EventRecur>({
    defaultValues: initialValues,
  });

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Borrar el evento recurrente</DialogTitle>
      <FormContainer formContext={formContext} onSuccess={onDelete}>
        <DialogContent>
          <RadioButtonGroup
            label=""
            name="option"
            options={[
              {
                id: "THIS_EVENT",
                label: "Este evento",
              },
              {
                id: "THIS_AND_THE_FOLLOWING_EVENTS",
                label: "Este y los eventos siguientes",
              },
              {
                id: "ALL_EVENTS",
                label: "Todos los eventos",
              },
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button>Aceptar</Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};
