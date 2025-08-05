import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { differenceInDays } from "date-fns";
import { useAuthApi } from "@/app/(api)/api";
import { EventInput } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import listPlugin from "@fullcalendar/list";

export type DatesSelection = {
  start: Date;
  end: Date;
  jsEvent: MouseEvent | null;
};

export default function Calendar({
  organizationId,
  onSelect,
}: {
  organizationId: number;
  onSelect: (arg: DatesSelection) => void;
}) {
  const getApi = useAuthApi();
  const router = useRouter();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(isDesktop);

  return (
    <>
      <FullCalendar
        locale={esLocale}
        plugins={[interactionPlugin, timeGridPlugin, listPlugin]}
        initialView={isDesktop ? "timeGridWeek" : "listWeek"}
        nowIndicator
        allDaySlot={false}
        selectable
        selectMirror
        selectAllow={({ start, end }) => {
          // for allowing to select only dates in same day
          return differenceInDays(end, start) <= 0;
        }}
        select={({ start, end, jsEvent }) => {
          onSelect({ start, end, jsEvent });
        }}
        // unselect
        // dateClick
        eventClick={(info) => {
          const event = info.event;
          router.push(`event/${event.id}/attendance`);
        }}
        events={(info, successCallback, failureCallback) => {
          return getApi().then((api) =>
            api
              .get<EventInput[]>("events", {
                params: { organizationId, start: info.start, end: info.end },
              })
              .then((r) => r.data)
              .then((events) =>
                successCallback(
                  events.map((event) => {
                    if (event.isACourse) {
                      event.backgroundColor = "green";
                    }
                    event.classNames = ["cursor-pointer"];
                    return event;
                  })
                )
              )
              .catch((err) => failureCallback(err))
          );
        }}
      />
      {!isDesktop && (
        <Button
          onClick={() =>
            onSelect({ start: new Date(), end: new Date(), jsEvent: null })
          }
          variant="contained"
        >
          +
        </Button>
      )}
    </>
  );
}
