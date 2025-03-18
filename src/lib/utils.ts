// src/lib/utils.ts
/**
 * Converts a date string (either "YYYY-MM-DD HH:mm:ss" or ISO with "T")
 * into a human-readable Korean format: "YYYY년 MM월 DD일 HH시 mm분".
 */
export const changeDateToKorean = (dateTime: string | undefined): string => {
  if (!dateTime) return "날짜 없음";

  let datePart = "";
  let timePart = "";

  if (dateTime.includes(" ")) {
    const parts = dateTime.split(" ");
    datePart = parts[0];
    timePart = parts[1] || "";
  } else if (dateTime.includes("T")) {
    const parts = dateTime.split("T");
    datePart = parts[0];
    timePart = parts[1] || "";
    if (timePart.includes(".")) {
      timePart = timePart.split(".")[0];
    }
    if (timePart.endsWith("Z")) {
      timePart = timePart.slice(0, -1);
    }
  } else {
    datePart = dateTime;
  }

  const [year, month, day] = datePart.split("-");
  let result = `${year}년 ${month}월 ${day}일`;

  if (timePart) {
    const [hour, minute] = timePart.split(":");
    if (hour && minute) {
      result += ` ${hour}시 ${minute}분`;
    }
  }

  return result;
};

export function formatScheduleTime(
  startDateTime: string,
  endDateTime: string
): string {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}월 ${String(date.getDate()).padStart(2, "0")}일`;
  };

  const formatTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, "0")}시 ${String(
      date.getMinutes()
    ).padStart(2, "0")}분`;
  };

  if (formatDate(start) === formatDate(end)) {
    return `${formatDate(start)} ${formatTime(start)} ~ ${formatTime(end)}`;
  }
  return `${formatDate(start)} ${formatTime(start)} ~ ${formatDate(
    end
  )} ${formatTime(end)}`;
}

/**
 * Checks whether the given date falls between eventStart and eventEnd (inclusive).
 * Both eventStart and eventEnd are expected to be date-time strings.
 */
export function isDateInRange(
  startDateTime: string,
  endDateTime: string,
  date: string
): boolean {
  const start = new Date(startDateTime.split(" ")[0]);
  const end = new Date(endDateTime.split(" ")[0]);
  const clickedDate = new Date(date);

  return clickedDate >= start && clickedDate <= end;
}
