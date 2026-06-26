import { authorizeCronRequest } from "@/lib/cron-auth";
import { processScheduledAutomations } from "@/lib/email/send";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const denied = authorizeCronRequest(request.headers.get("authorization"));
  if (denied) return denied;

  try {
    const result = await processScheduledAutomations();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Email cron error:", error);
    return NextResponse.json(
      { error: "Failed to process emails." },
      { status: 500 }
    );
  }
}
