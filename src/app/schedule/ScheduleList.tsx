"use client";

import { useSchedules } from "@/hooks/useSchedules";
import { changeDateToKorean, isDateInRange } from "@/lib/utils";
import { Schedule } from "@/types/schedule";
import { JSX } from "react";

interface ScheduleListProps {
  selectedDate: string | null;
}

export default function ScheduleList({
  selectedDate,
}: ScheduleListProps): JSX.Element {
  const schedules = useSchedules();

  const filteredSchedules = schedules.filter((schedule: Schedule) => {
    if (!selectedDate) return true;
    return isDateInRange(
      schedule.startDateTime,
      schedule.endDateTime,
      selectedDate
    );
  });

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h2 className="text-xl font-semibold mb-4">
        📋{" "}
        {selectedDate
          ? `${changeDateToKorean(selectedDate)} Schedule`
          : "All Schedules"}
      </h2>
      <ul className="space-y-2">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule: Schedule) => (
            <li key={schedule.id} className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">{schedule.title}</p>
              <p className="text-sm text-gray-500">
                {changeDateToKorean(schedule.startDateTime)} -{" "}
                {changeDateToKorean(schedule.endDateTime)}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No schedules for this date.</p>
        )}
      </ul>
    </div>
  );
}
