"use client";

import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
}

const Calendar = ({ events }: { events: Event[] }) => {
  const [localEvents, setLocalEvents] = useState<Event[]>(events);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const handleEventClick = async (clickInfo: EventClickArg) => {
    if (window.confirm(`"${clickInfo.event.title}" 일정을 삭제하시겠습니까?`)) {
      await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: clickInfo.event.id }),
      });

      setLocalEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={localEvents}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
