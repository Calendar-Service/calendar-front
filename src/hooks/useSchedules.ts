import { fetchSchedules } from "@/lib/api";
import { Schedule } from "@/types/schedule";
import { useEffect, useState } from "react";

export function useSchedules(): Schedule[] {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const loadSchedules = async () => {
      const data = await fetchSchedules();
      setSchedules(data);
    };
    loadSchedules();
  }, []);

  return schedules;
}
