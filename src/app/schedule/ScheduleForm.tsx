// src/app/schedule/ScheduleForm.tsx
"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { addSchedule, updateSchedule } from "@/lib/api";
import { Schedule } from "@/types/schedule";
import { JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ScheduleFormProps {
  selectedSchedule?: Schedule | null;
  open: boolean;
  onClose: () => void;
  onDelete?: (id: number) => void;
}

export default function ScheduleForm({
  selectedSchedule,
  open,
  onClose,
  onDelete,
}: ScheduleFormProps): JSX.Element {
  const isEditing = Boolean(selectedSchedule);

  const defaultDate = new Date().toISOString().split("T")[0];
  const defaultTime = new Date().toISOString().split("T")[1].slice(0, 5);

  const [title, setTitle] = useState(selectedSchedule?.title || "");
  const [startDate, setStartDate] = useState(
    selectedSchedule?.startDateTime.split(" ")[0] || defaultDate
  );
  const [startTime, setStartTime] = useState(
    selectedSchedule?.startDateTime.split(" ")[1] || defaultTime
  );
  const [endDate, setEndDate] = useState(
    selectedSchedule?.endDateTime.split(" ")[0] || defaultDate
  );
  const [endTime, setEndTime] = useState(
    selectedSchedule?.endDateTime.split(" ")[1] || defaultTime
  );

  useEffect(() => {
    if (selectedSchedule) {
      setTitle(selectedSchedule.title);
      setStartDate(selectedSchedule.startDateTime.split(" ")[0]);
      setStartTime(selectedSchedule.startDateTime.split(" ")[1]);
      setEndDate(selectedSchedule.endDateTime.split(" ")[0]);
      setEndTime(selectedSchedule.endDateTime.split(" ")[1]);
    }
  }, [selectedSchedule]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const scheduleData = {
      title,
      note: "",
      startDateTime: `${startDate} ${startTime}`,
      endDateTime: `${endDate} ${endTime}`,
      userId: 1,
    };

    try {
      if (isEditing && selectedSchedule) {
        await updateSchedule(selectedSchedule.id, scheduleData);
        toast.success("일정이 수정되었습니다. ✅");
      } else {
        await addSchedule(scheduleData);
        toast.success("새 일정이 추가되었습니다. 🎉");
      }
      onClose();
    } catch (error) {
      const errorMessage = error as Error;
      console.error(errorMessage);
      toast.error("일정 저장 중 오류가 발생했습니다. ❌");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "일정 수정" : "새 일정 추가"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="일정 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit">{isEditing ? "수정" : "추가"}</Button>
            {isEditing && selectedSchedule && onDelete && (
              <Button
                className="bg-red-500"
                onClick={() => onDelete(selectedSchedule.id)}
              >
                삭제
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
