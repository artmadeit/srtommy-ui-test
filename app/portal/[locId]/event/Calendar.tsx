import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { differenceInDays } from "date-fns";
import { useAuthApi } from "@/app/(api)/api";
import { EventInput } from "@fullcalendar/core/index.js";

export type DatesSelection = {
  start: Date;
  end: Date;
  jsEvent: MouseEvent | null;
};

export default function Calendar({
  onSelect,
}: {
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
              params: { start: info.start, end: info.end },
            })
            .then((r) => r.data)
            .then((events) => successCallback(events))
            .catch((err) => failureCallback(err))
        );
      }}
    />
  );
}
