import { NextResponse } from "next/server";

export function authorizeCronRequest(
  authHeader: string | null
): NextResponse | null {
  const secret = process.env.CRON_SECRET;

  if (process.env.NODE_ENV === "production" && !secret) {
    return NextResponse.json(
      { error: "Cron is not configured." },
      { status: 503 }
    );
  }

  if (!secret) {
    return null;
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
