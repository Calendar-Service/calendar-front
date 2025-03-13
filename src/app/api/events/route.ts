import axios from "axios";
import { NextResponse } from "next/server";

let events: Array<{
  id: string;
  title: string;
  start: string;
  end: string;
}> = [];

export const fetchSchedules = async () => {
  try {
    const response = await axios.get("http://43.202.122.199/api/v1/schedules");
    console.log("📅 스케줄 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 스케줄 데이터 가져오기 실패:", error);
    return [];
  }
};

// 일정 목록 가져오기 (GET)
export const GET = () => {
  return NextResponse.json(events);
};

// 일정 추가 (POST)
export const POST = async (req: Request) => {
  const { title, start, end } = await req.json();
  const newEvent = { id: String(events.length + 1), title, start, end };
  events.push(newEvent);
  console.log(events);
  return NextResponse.json(newEvent, { status: 201 });
};

// 일정 삭제 (DELETE)
export const DELETE = async (req: Request) => {
  const { id } = await req.json();
  events = events.filter((event) => event.id !== id);
  return NextResponse.json({ message: "Deleted" });
};
