import { Schedule } from "@/types/schedule";
import axios from "axios";

const API_BASE_URL = "http://43.202.122.199/api/v1";

export const fetchSchedules = async (): Promise<Schedule[]> => {
  const response = await axios.get(`${API_BASE_URL}/schedules`);
  return response.data;
};

export const addSchedule = async (
  scheduleData: Omit<Schedule, "id">
): Promise<Schedule> => {
  const response = await axios.post(`${API_BASE_URL}/schedules`, scheduleData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
