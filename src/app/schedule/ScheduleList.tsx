// src/app/schedule/ScheduleList.tsx
"use client";

import { changeDateToKorean, isDateInRange } from "@/lib/utils";
import { Schedule } from "@/types/schedule";
import { JSX, useState } from "react";

interface ScheduleListProps {
  selectedDate: string | null;
  schedules: Schedule[];
  onClearDate: () => void;
  onEditSchedule: (schedule: Schedule) => void;
  onDeleteSchedule: (id: number) => void;
  onAddScheduleClick: () => void;
}

const MAX_LENGTH = 20;

export default function ScheduleList({
  selectedDate,
  schedules,
  onClearDate,
  onEditSchedule,
  onDeleteSchedule,
  onAddScheduleClick,
}: ScheduleListProps): JSX.Element {
  const [expandedNotes, setExpandedNotes] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleNote = (id: number) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredSchedules = schedules.filter((schedule) => {
    if (!selectedDate) return true;
    return isDateInRange(
      schedule.startDateTime,
      schedule.endDateTime,
      selectedDate
    );
  });

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
            <button
              onClick={onClearDate}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
            >
              전체 일정 보기
            </button>
          )}
          <button
            onClick={onAddScheduleClick}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            일정 추가
          </button>
        </div>
      </div>
      {filteredSchedules.length > 0 ? (
        <ul className="space-y-4">
          {filteredSchedules.map((schedule) => {
            const isExpanded = expandedNotes[schedule.id] || false;
            const note = schedule.note || "";
            const shouldTruncate = note.length > MAX_LENGTH;

            return (
              <li
                key={schedule.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 flex justify-between items-start cursor-pointer"
                onClick={() => onEditSchedule(schedule)}
              >
                <div className="flex flex-col w-full">
                  <p className="text-lg font-semibold text-gray-900">
                    {schedule.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {changeDateToKorean(schedule.startDateTime)} ~{" "}
                    {changeDateToKorean(schedule.endDateTime)}
                  </p>
                  {note && (
                    <p
                      className="text-sm text-gray-500 mt-1 whitespace-pre-wrap"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {shouldTruncate && !isExpanded ? (
                        <>
                          {note.slice(0, MAX_LENGTH)}...{" "}
                          <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNote(schedule.id);
                            }}
                          >
                            더보기
                          </span>
                        </>
                      ) : (
                        <>
                          {note}{" "}
                          {shouldTruncate && (
                            <span
                              className="text-blue-500 cursor-pointer hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleNote(schedule.id);
                              }}
                            >
                              접기
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  )}
                </div>

                {/* ❌ 삭제 버튼 */}
                <button
                  className="text-gray-500 hover:text-red-500 text-xl ml-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSchedule(schedule.id);
                  }}
                >
                  ❌
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          해당 날짜에 일정이 없습니다.
        </p>
      )}
    </div>
  );
}
