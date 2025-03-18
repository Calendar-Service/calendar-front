// src/lib/api.ts
import { API_BASE_URL } from "@/config/constants";
import { Schedule, ScheduleResponse } from "@/types/schedule";
import axios from "axios";

export const fetchSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get<ScheduleResponse>(
    `${API_BASE_URL}/schedules`
  );
  return response.data.items;
};

export async function addSchedule(
  schedule: Omit<Schedule, "id">
): Promise<Schedule> {
  try {
    const response = await fetch("http://43.202.122.199/api/v1/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schedule),
    });

    if (!response.ok) {
      throw new Error("일정 추가 실패");
    }

    return response.json();
  } catch (error) {
    console.error("추가 오류:", error);
    throw error;
  }
}

export const updateSchedule = async (
  id: number,
  updatedData: Partial<Omit<Schedule, "id">>
): Promise<Schedule> => {
  const response = await axios.put(
    `${API_BASE_URL}/schedules/${id}`,
    updatedData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteSchedule = async (id: number): Promise<Schedule> => {
  const response = await axios.delete(`${API_BASE_URL}/schedules/${id}`);
  return response.data;
};
