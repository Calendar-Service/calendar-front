"use client";

import Calendar from "@/components/Calendar";
import EventForm from "@/components/EventForm";
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
    const startDate = new Date(eventStart);
    const endDate = eventEnd ? new Date(eventEnd) : startDate;
    const clickedDate = new Date(date);

    return clickedDate >= startDate && clickedDate <= endDate;
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">플업과 함께, 계획도 정산도 한방에!</h1>

      {/* 캘린더 + 일정 리스트 레이아웃 */}
      <div className="flex w-full max-w-5xl gap-4">
        {/* 캘린더 (2/3) */}
        <div className="w-2/3 bg-white shadow-lg p-4 rounded-lg">
          <Calendar events={events} onDateClick={setSelectedDate} />
        </div>

        {/* 일정 리스트 (1/3) */}
        <div className="w-1/3 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            📋 {selectedDate ? `${selectedDate} 일정` : "전체 일정"}
          </h2>
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
                      {event.start} ~ {event.end || event.start}
                    </p>
                  </li>
                ))
            ) : (
              <p className="text-gray-500">해당 날짜에 일정이 없습니다.</p>
            )}
            <div className="justify-self-end">
              <EventForm onAddEvent={addEvent} />
            </div>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
