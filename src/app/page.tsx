"use client";

import Calendar from "@/components/Calendar";
import ScheduleList from "@/components/ScheduleList";
import { useEffect, useState } from "react";

const Home = () => {
  const [events, setEvents] = useState<
    { id: string; title: string; start: string; end: string }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      {/* 캘린더 + 일정 리스트 레이아웃 */}
      <div className="flex w-full max-w gap-4">
        {/* 캘린더 (2/3) */}
        <div className="w-2/3 bg-white shadow-lg p-4 rounded-lg">
          <Calendar events={events} onDateClick={setSelectedDate} />
        </div>
        <ScheduleList selectedDate={selectedDate} />
      </div>
    </main>
  );
};

export default Home;
