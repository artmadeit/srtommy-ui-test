import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar() {
  return (
    <FullCalendar
      locale={esLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
}
