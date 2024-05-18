import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { differenceInDays, format } from "date-fns";
import { useAuthApi } from "@/app/(api)/api";
import { EventInput } from "@fullcalendar/core/index.js";

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

  return (
    <FullCalendar
      locale={esLocale}
      plugins={[interactionPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      nowIndicator
      allDaySlot={false}
      selectable
      selectMirror
      //   eventClick
      selectAllow={({ start, end }) => {
        // for allowing to select only dates in same day
        return differenceInDays(end, start) <= 0;
      }}
      select={({ start, end, jsEvent }) => {
        onSelect({ start, end, jsEvent });
      }}
      // unselect
      // dateClick
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
                  if (event.daysOfWeek && event.daysOfWeek.length > 0) {
                    if (event.start instanceof Date) {
                      event.startTime = format(event.start, "HH:mm:SS");
                    }
                    if (event.end instanceof Date) {
                      event.endTime = format(event.end, "HH:mm:SS");
                    }
                  }

                  return event;
                })
              )
            )
            .catch((err) => failureCallback(err))
        );
      }}
    />
  );
}
