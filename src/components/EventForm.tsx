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
import { useState } from "react";

export default function EventForm({
  onAddEvent,
}: {
  onAddEvent: (event: { title: string; start: string; end: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = () => {
    if (title && startDate) {
      onAddEvent({ title, start: startDate, end: endDate });
      setTitle("");
      setStartDate(new Date().toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <Dialog>
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
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span>시작일</span>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span>종료일</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSubmit}>추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
