// src/app/schedule/ScheduleCalendar.tsx
"use client";

import { Schedule } from "@/types/schedule";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { JSX } from "react";

interface ScheduleCalendarProps {
  schedules: Schedule[];
  onDateSelect: (date: string) => void;
}

export default function ScheduleCalendar({
  schedules,
  onDateSelect,
}: ScheduleCalendarProps): JSX.Element {
  const events = schedules.map((schedule) => ({
    title: schedule.title,
    start: schedule.startDateTime,
    end: schedule.endDateTime,
  }));

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ko"
        initialView="dayGridMonth"
        events={events}
        dateClick={(arg: DateClickArg) => onDateSelect(arg.dateStr)}
      />
    </div>
  );
}
