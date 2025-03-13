import { fetchSchedules } from "@/app/api/events/route";
import EventForm from "@/components/EventForm";
import { useEffect, useState } from "react";

const changeDateToKorean = (date: string | undefined) => {
  if (!date) return "날짜 없음";
  const [year, month, day] = date.split("-");
  return `${year}년 ${month}월 ${day}일`;
};

const isDateInRange = (
  eventStart: string,
  eventEnd: string | undefined,
  date: string
) => {
  const startDate = new Date(eventStart.split("T")[0]); // 시작 날짜 (YYYY-MM-DD)
  const endDate = eventEnd ? new Date(eventEnd.split("T")[0]) : startDate; // 종료 날짜 (YYYY-MM-DD)
  const clickedDate = new Date(date.split("T")[0]); // 클릭한 날짜

  return clickedDate >= startDate && clickedDate <= endDate;
};

const ScheduleList = ({ selectedDate }: { selectedDate: string | null }) => {
  const [schedules, setSchedules] = useState<
    Array<{
      id: number;
      title: string;
      note: string;
      startDateTime: string;
      endDateTime: string;
      userId: number;
    }>
  >([]);

  useEffect(() => {
    const loadSchedules = async () => {
      const data = await fetchSchedules();
      setSchedules(data); // 가져온 데이터를 상태에 저장
    };

    loadSchedules();
  }, []);

  return (
    <div className="w-1/3 bg-white shadow-lg p-4 rounded-lg">
      {/* 헤더 (제목 + 일정 추가 버튼) */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">
          📋{" "}
          {selectedDate
            ? `${changeDateToKorean(selectedDate)} 일정`
            : "전체 일정"}
        </h2>
        <div className="justify-self-end mb-4">
          <EventForm onAddEvent={() => {}} selectedDate={selectedDate} />
        </div>
      </div>

      {/* 일정 리스트 */}
      <ul className="space-y-2">
        {schedules.filter(
          (schedule) =>
            !selectedDate ||
            isDateInRange(
              schedule.startDateTime,
              schedule.endDateTime,
              selectedDate
            )
        ).length > 0 ? (
          schedules
            .filter(
              (schedule) =>
                !selectedDate ||
                isDateInRange(
                  schedule.startDateTime,
                  schedule.endDateTime,
                  selectedDate
                )
            )
            .map((schedule) => (
              <li key={schedule.id} className="p-2 bg-gray-100 rounded-lg">
                <p className="font-semibold">{schedule.title}</p>
                <p className="text-sm text-gray-500">
                  {changeDateToKorean(schedule.startDateTime.split("T")[0])} ~{" "}
                  {changeDateToKorean(schedule.endDateTime?.split("T")[0])}
                </p>
              </li>
            ))
        ) : (
          <p className="text-gray-500">해당 날짜에 일정이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default ScheduleList;
