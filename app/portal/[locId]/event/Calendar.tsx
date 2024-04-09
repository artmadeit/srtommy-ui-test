import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar() {
  return (
    <FullCalendar
      locale={esLocale}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
    />
  );
}
