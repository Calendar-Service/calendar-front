// src/app/schedule/ScheduleList.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { deleteSchedule, fetchSchedules } from "@/lib/api";
import { changeDateToKorean, isDateInRange } from "@/lib/utils";
import { Schedule } from "@/types/schedule";
import { JSX, useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm";

interface ScheduleListProps {
  selectedDate: string | null;
  onClearDate: () => void;
  onAddScheduleClick: () => void; // 🛠️ 추가됨
}

export default function ScheduleList({
  selectedDate,
  onClearDate,
  onAddScheduleClick,
}: ScheduleListProps): JSX.Element {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  useEffect(() => {
    const loadSchedules = async (): Promise<void> => {
      const data = await fetchSchedules();
      setSchedules(data);
    };

    loadSchedules();
  }, []);

  const filteredSchedules = schedules.filter((schedule: Schedule) => {
    if (!selectedDate) return true;
    return isDateInRange(
      schedule.startDateTime,
      schedule.endDateTime,
      selectedDate
    );
  });

  const handleEditClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteSchedule(id);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📋{" "}
          {selectedDate
            ? `${changeDateToKorean(selectedDate)} 일정`
            : "전체 일정"}
        </h2>
        <div className="flex gap-2">
          {selectedDate && (
            <Button onClick={onClearDate} className="bg-gray-300 text-gray-800">
              전체 일정 보기
            </Button>
          )}
          <Button onClick={onAddScheduleClick}>일정 추가</Button>
        </div>
      </div>
      {filteredSchedules.length > 0 ? (
        <ul className="space-y-4">
          {filteredSchedules.map((schedule: Schedule) => (
            <li
              key={schedule.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleEditClick(schedule)}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold text-gray-900">
                  {schedule.title}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex flex-col">
                  <span className="font-semibold">시작</span>
                  <span>{changeDateToKorean(schedule.startDateTime)}</span>
                </div>
                <div className="mx-4 text-xl">~</div>
                <div className="flex flex-col">
                  <span className="font-semibold">종료</span>
                  <span>{changeDateToKorean(schedule.endDateTime)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          해당 날짜에 일정이 없습니다.
        </p>
      )}

      {/* 수정 모달 */}
      {isEditModalOpen && selectedSchedule && (
        <ScheduleForm
          selectedSchedule={selectedSchedule}
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
