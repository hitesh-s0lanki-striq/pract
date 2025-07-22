import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userAgent = req.headers.get("user-agent") || "";
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0] || "";

  console.log(forwardedFor);

  // build the Plausible payload
  const payload = {
    ...body,
    domain: process.env.PLAUSIBLE_DOMAIN,
  };

  const resp = await axios.post("https://plausible.io/api/event", payload, {
    headers: {
      "User-Agent": userAgent,
      "X-Forwarded-For": "::1",
      "Content-Type": "application/json",
      "X-Debug-Request": "true", // optional, returns what Plausible sees
    },
  });

  return NextResponse.json(
    { status: resp.status, data: resp.data },
    { status: resp.status }
  );
}
