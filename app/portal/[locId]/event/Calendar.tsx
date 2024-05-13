import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { differenceInDays } from "date-fns";

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
    />
  );
}
