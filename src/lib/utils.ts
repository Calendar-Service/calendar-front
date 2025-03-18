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

/**
 * Checks whether the given date falls between eventStart and eventEnd (inclusive).
 * Both eventStart and eventEnd are expected to be date-time strings.
 */
export const isDateInRange = (
  eventStart: string,
  eventEnd: string | undefined,
  date: string
): boolean => {
  const startDate = new Date(eventStart.split("T")[0]);
  const endDate = eventEnd ? new Date(eventEnd.split("T")[0]) : startDate;
  const clickedDate = new Date(date.split("T")[0]);
  return clickedDate >= startDate && clickedDate <= endDate;
};
