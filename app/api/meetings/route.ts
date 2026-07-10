import { getMeetings } from "@/lib/meetings-db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date'); // for example, "2026-05-03" or null
  const meetings = getMeetings(date);
  return NextResponse.json(meetings);
}