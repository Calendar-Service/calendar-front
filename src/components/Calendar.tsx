"use client";

import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

const Calendar = ({
  events,
  onDateClick,
}: {
  events: Event[];
  onDateClick: (date: string) => void;
}) => {
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

  const handleDateClick = (arg: DateClickArg) => {
    onDateClick(arg.dateStr); // 날짜를 클릭하면 부모 컴포넌트(Home)에서 selectedDate 업데이트
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={"ko"}
      events={localEvents}
      eventClick={handleEventClick}
      dateClick={handleDateClick} // ✅ 날짜 클릭 시 실행
    />
  );
};

export default Calendar;
