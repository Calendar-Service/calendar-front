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

export const addSchedule = async (
  scheduleData: Omit<Schedule, "id">
): Promise<Schedule> => {
  const response = await axios.post(`${API_BASE_URL}/schedules`, scheduleData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

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
