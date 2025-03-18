// src/app/api/schedules/route.ts
import { schedules } from "@/lib/scheduleStore";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { count: schedules.length, items: schedules },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const newSchedule = await request.json();
    newSchedule.id = schedules.length
      ? schedules[schedules.length - 1].id + 1
      : 1;
    schedules.push(newSchedule);
    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    // Check if error is an instance of Error; otherwise, convert it to a string.
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
