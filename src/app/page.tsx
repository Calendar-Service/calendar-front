"use client";

import Calendar from "@/components/Calendar";
import EventForm from "@/components/EventForm";
import changeDateToKorean from "@/utils/changeDateToKorean";
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

  const addEvent = async (newEvent: {
    title: string;
    start: string;
    end?: string;
  }) => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    const addedEvent = await res.json();
    setEvents((prevEvents) => [...prevEvents, addedEvent]);
  };

  const isDateInRange = (
    eventStart: string,
    eventEnd: string | undefined,
    date: string
  ) => {
    const startDate = new Date(eventStart.split("T")[0]);
    const endDate = eventEnd ? new Date(eventEnd.split("T")[0]) : startDate;
    const clickedDate = new Date(date.split("T")[0]);

    return clickedDate >= startDate && clickedDate <= endDate;
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      {/* 캘린더 + 일정 리스트 레이아웃 */}
      <div className="flex w-full max-w gap-4">
        {/* 캘린더 (2/3) */}
        <div className="w-2/3 bg-white shadow-lg p-4 rounded-lg">
          <Calendar events={events} onDateClick={setSelectedDate} />
        </div>

        {/* 일정 리스트 (1/3) */}
        <div className="w-1/3 bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-4">
              📋{" "}
              {selectedDate
                ? `${changeDateToKorean(selectedDate)} 일정`
                : "전체 일정"}
            </h2>
            <div className="justify-self-end mb-4">
              <EventForm onAddEvent={addEvent} selectedDate={selectedDate} />
            </div>
          </div>
          <ul className="space-y-2">
            {events.filter(
              (event) =>
                !selectedDate ||
                isDateInRange(event.start, event.end, selectedDate)
            ).length > 0 ? (
              events
                .filter(
                  (event) =>
                    !selectedDate ||
                    isDateInRange(event.start, event.end, selectedDate)
                )
                .map((event) => (
                  <li key={event.id} className="p-2 bg-gray-100 rounded-lg">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-500">
                      {changeDateToKorean(event.start?.split("T")[0])} ~{" "}
                      {changeDateToKorean(event.end?.split("T")[0])}
                    </p>
                  </li>
                ))
            ) : (
              <p className="text-gray-500">해당 날짜에 일정이 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
