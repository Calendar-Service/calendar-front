// src/app/api/schedules/[id]/route.ts
import { schedules } from "@/lib/scheduleStore";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const schedule = schedules.find((s) => s.id === id);
  if (!schedule) {
    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  }
  return NextResponse.json(schedule, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  try {
    const updatedData = await request.json();
    const index = schedules.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }
    schedules[index] = { ...schedules[index], ...updatedData, id };
    return NextResponse.json(schedules[index], { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const index = schedules.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  }
  const deletedSchedule = schedules.splice(index, 1)[0];
  return NextResponse.json(deletedSchedule, { status: 200 });
}
