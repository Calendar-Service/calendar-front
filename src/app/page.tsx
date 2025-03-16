"use client";

import { JSX, useState } from "react";
import ScheduleCalendar from "./schedule/ScheduleCalendar";
import ScheduleForm from "./schedule/ScheduleForm";
import ScheduleList from "./schedule/ScheduleList";

export default function Home(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Calendar & Schedule Management
      </h1>
      <div className="flex gap-6">
        <div className="w-2/3">
          <ScheduleCalendar onDateSelect={setSelectedDate} />
        </div>
        <div className="w-1/3">
          <ScheduleList selectedDate={selectedDate} />
          <ScheduleForm selectedDate={selectedDate} />
        </div>
      </div>
    </main>
  );
}
