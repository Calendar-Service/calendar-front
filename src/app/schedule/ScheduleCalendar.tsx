// src/app/schedule/ScheduleCalendar.tsx
"use client";

import { useSchedules } from "@/hooks/useSchedules";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { JSX } from "react";

interface ScheduleCalendarProps {
  onDateSelect: (date: string) => void;
}

export default function ScheduleCalendar({
  onDateSelect,
}: ScheduleCalendarProps): JSX.Element {
  const schedules = useSchedules();

  const handleDateClick = (arg: DateClickArg): void => {
    onDateSelect(arg.dateStr);
  };

  const events = schedules.map((schedule) => ({
    title: schedule.title,
    start: schedule.startDateTime,
    end: schedule.endDateTime,
  }));

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
}
