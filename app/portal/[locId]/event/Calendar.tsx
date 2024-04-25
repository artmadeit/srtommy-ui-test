import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import timeGridPlugin from "@fullcalendar/timegrid";

import esLocale from "@fullcalendar/core/locales/es";

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
      // select
      // unselect
      // dateClick
    />
  );
}
