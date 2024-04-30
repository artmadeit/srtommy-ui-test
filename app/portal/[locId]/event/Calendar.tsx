import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import timeGridPlugin from "@fullcalendar/timegrid";

import esLocale from "@fullcalendar/core/locales/es";
import { differenceInDays } from "date-fns";

export default function Calendar() {
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
        // for allowing only select / drag only in that day
        return differenceInDays(end, start) <= 0;
      }}
      select={({ start, end, jsEvent }) => {
        console.log(start, end);
        console.log(jsEvent);
      }}
      // unselect
      // dateClick
    />
  );
}
