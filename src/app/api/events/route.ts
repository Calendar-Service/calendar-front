import { NextResponse } from "next/server";

let events = [
  { id: "1", title: "팀 회의", start: "2024-03-01" },
  { id: "2", title: "스터디", start: "2024-03-05" },
];

// 일정 목록 가져오기 (GET)
export async function GET() {
  return NextResponse.json(events);
}

// 일정 추가 (POST)
export async function POST(req: Request) {
  const { title, start } = await req.json();
  const newEvent = { id: String(events.length + 1), title, start };
  events.push(newEvent);
  return NextResponse.json(newEvent, { status: 201 });
}

// 일정 삭제 (DELETE)
export async function DELETE(req: Request) {
  const { id } = await req.json();
  events = events.filter((event) => event.id !== id);
  return NextResponse.json({ message: "Deleted" });
}
