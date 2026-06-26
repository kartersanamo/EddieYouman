import { createQuoteRequest, QuoteIntakeError } from "@/lib/quote-intake";
import { getClientIpFromRequest } from "@/lib/request-ip";
import { quoteRequestSchema } from "@/lib/validators/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid quote request.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const ip = getClientIpFromRequest(request);

    try {
      const quote = await createQuoteRequest({
        ...parsed.data,
        clientIp: ip,
      });

      return NextResponse.json({ ok: true, token: quote.publicToken });
    } catch (error) {
      if (error instanceof QuoteIntakeError) {
        const status =
          error.code === "RATE_LIMIT"
            ? 429
            : error.code === "HONEYPOT" || error.code === "INVALID"
              ? 400
              : error.code === "MAILGUN_NOT_CONFIGURED"
                ? 503
                : 500;
        return NextResponse.json({ error: error.message }, { status });
      }

      const message =
        error instanceof Error ? error.message : "Quote request failed.";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
