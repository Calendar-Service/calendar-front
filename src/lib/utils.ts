export const changeDateToKorean = (dateTime: string): string => {
  const [date] = dateTime.split("T"); // "YYYY-MM-DD"
  const [year, month, day] = date.split("-");
  return `${year}년 ${month}월 ${day}일`;
};

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
