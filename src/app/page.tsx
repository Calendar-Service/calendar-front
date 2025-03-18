// src/app/page.tsx
"use client";

import { deleteSchedule, fetchSchedules } from "@/lib/api";
import { Schedule } from "@/types/schedule";
import { JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScheduleCalendar from "./schedule/ScheduleCalendar";
import ScheduleForm from "./schedule/ScheduleForm";
import ScheduleList from "./schedule/ScheduleList";

export default function Home(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  // 📅 최초 일정 가져오기
  useEffect(() => {
    const loadSchedules = async () => {
      const data = await fetchSchedules();
      setSchedules(data);
    };
    loadSchedules();
  }, []);

  // 📅 날짜 선택 시 해당 날짜 일정 필터링
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  // 🔄 전체 일정 보기
  const handleClearDate = () => {
    setSelectedDate(null);
  };

  // 🆕 일정 추가 버튼 클릭 시
  const handleAddScheduleClick = () => {
    setSelectedSchedule(null);
    setIsFormOpen(true);
  };

  // ✅ 일정 추가/수정 후 업데이트 (onSaveSchedule 함수)
  const handleSaveSchedule = (
    updatedSchedule: Schedule,
    isEditing: boolean
  ) => {
    setSchedules((prev) => {
      if (isEditing) {
        return prev.map((s) =>
          s.id === updatedSchedule.id ? updatedSchedule : s
        );
      }
      return [...prev, updatedSchedule];
    });
    setIsFormOpen(false);
  };

  // ❌ 일정 삭제 후 업데이트
  const handleDeleteSchedule = async (id: number) => {
    try {
      await deleteSchedule(id);
      setSchedules((prev) => prev.filter((s) => s.id !== id)); // ✅ UI에서 즉시 반영
      toast.success("일정이 삭제되었습니다. 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("일정 삭제에 실패했습니다. ❌");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex gap-6">
        <div className="w-2/3">
          <ScheduleCalendar
            schedules={schedules}
            onDateSelect={handleDateSelect}
          />
        </div>
        <div className="w-1/3">
          <ScheduleList
            selectedDate={selectedDate}
            schedules={schedules}
            onClearDate={handleClearDate}
            onEditSchedule={(schedule) => {
              setSelectedSchedule(schedule);
              setIsFormOpen(true);
            }}
            onDeleteSchedule={handleDeleteSchedule}
            onAddScheduleClick={handleAddScheduleClick}
          />
        </div>
      </div>
      {isFormOpen && (
        <ScheduleForm
          selectedSchedule={selectedSchedule}
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSaveSchedule={handleSaveSchedule}
        />
      )}
    </main>
  );
}
