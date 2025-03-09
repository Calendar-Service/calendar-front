"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const EventForm = ({
  onAddEvent,
  selectedDate,
}: {
  onAddEvent: (event: { title: string; start: string; end: string }) => void;
  selectedDate: string | null;
}) => {
  const defaultDate =
    selectedDate ||
    new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
  const defaultTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[1]
    .split(".")[0]
    ?.slice(0, 5);

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState(defaultTime);
  const [endDate, setEndDate] = useState(defaultDate);
  const [endTime, setEndTime] = useState(defaultTime);

  useEffect(() => {
    if (!selectedDate) return;
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  }, [selectedDate]);

  const handleSubmit = () => {
    if (title && startDate) {
      onAddEvent({
        title,
        start: startDate + "T" + startTime,
        end: endDate + "T" + endTime,
      });
      setTitle("");
      setStartDate(defaultDate);
      setEndDate(defaultDate);

      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">새로운 일정 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새로운 일정 추가</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="일정 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <span>시작</span>
            <div className="flex">
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <span>종료</span>
            <div className="flex ">
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit}>추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
