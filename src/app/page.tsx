"use client";

import Calendar from "@/components/Calendar";
import EventForm from "@/components/EventForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<
    { id: string; title: string; start: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const addEvent = async (newEvent: { title: string; start: string }) => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    const addedEvent = await res.json();
    setEvents([...events, addedEvent]);
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">📅</h1>
      <EventForm onAddEvent={addEvent} />
      <Calendar events={events} /> {/* ✅ props 전달 */}
    </main>
  );
}
