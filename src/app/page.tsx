// src/app/page.tsx
"use client";

import { JSX, useState } from "react";
import { Toaster } from "react-hot-toast";
import ScheduleCalendar from "./schedule/ScheduleCalendar";
import ScheduleForm from "./schedule/ScheduleForm";
import ScheduleList from "./schedule/ScheduleList";

export default function Home(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
  };

  const handleClearDate = (): void => {
    setSelectedDate(null);
  };

  const handleAddScheduleClick = (): void => {
    setIsFormOpen(true);
  };

  const handleFormClose = (): void => {
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Calendar & Schedule Management
      </h1>
      <div className="flex gap-6">
        <div className="w-2/3">
          <ScheduleCalendar onDateSelect={handleDateSelect} />
        </div>
        <div className="w-1/3">
          <ScheduleList
            selectedDate={selectedDate}
            onClearDate={handleClearDate}
            onAddScheduleClick={handleAddScheduleClick} // ✅ 이제 정상적으로 전달됨
          />
        </div>
      </div>
      {isFormOpen && (
        <ScheduleForm
          selectedSchedule={null}
          open={isFormOpen}
          onClose={handleFormClose}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
