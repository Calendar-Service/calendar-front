// src/types/schedule.ts
export interface Schedule {
  id: number;
  title: string;
  note: string;
  startDateTime: string; // e.g., "2020-12-21 12:12:12" or ISO string
  endDateTime: string;
  memberId: number;
}

export interface ScheduleResponse {
  count: number;
  items: Schedule[];
}
