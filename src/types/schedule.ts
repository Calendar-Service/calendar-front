export interface Schedule {
  id: number;
  title: string;
  note: string;
  startDateTime: string; // ISO format, e.g. "2025-03-13T12:31:06.436Z"
  endDateTime: string;
  userId: number;
}
