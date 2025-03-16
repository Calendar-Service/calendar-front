"use client";

import { addSchedule } from "@/lib/api";
import { JSX, useEffect, useState } from "react";

interface ScheduleFormProps {
  selectedDate: string | null;
}

export default function ScheduleForm({
  selectedDate,
}: ScheduleFormProps): JSX.Element {
  // 기본 날짜: 선택된 날짜가 없으면 한국 시간 기준 오늘 날짜 사용
  const defaultDate =
    selectedDate ||
    new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
  const defaultTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[1]
    .slice(0, 5);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState(defaultTime);
  const [endDate, setEndDate] = useState(defaultDate);
  const [endTime, setEndTime] = useState(defaultTime);

  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const scheduleData = {
      title,
      note: "",
      startDateTime: `${startDate}T${startTime}:00.000Z`,
      endDateTime: `${endDate}T${endTime}:00.000Z`,
      userId: 1,
    };

    await addSchedule(scheduleData);
    setTitle("");
    setStartDate(defaultDate);
    setEndDate(defaultDate);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Schedule</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Start</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <label className="block mb-1">End</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Schedule
      </button>
    </form>
  );
}
