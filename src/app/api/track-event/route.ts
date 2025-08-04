import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const xff = request.headers.get("x-forwarded-for");
  const clientIp = xff?.split(",")[0] || "::1";

  // put event axios event
  const plausibleEvent = {
    domain: "strique.io",
    name: "test_event_listener",
    url: `http://localhost:3000/api/test`,
    props: {
      test_report: "hitesh.test@strique.io",
      org_name: "This is from vercel Connect",
    },
  };

  try {
    const response = await axios.post(
      "https://plausible.io/api/event",
      plausibleEvent,
      {
        headers: {
          "User-Agent": request.headers.get("User-Agent"), // for accurate visitor deduplication
          "Content-Type": "application/json",
          "X-Forwarded-For": clientIp,
        },
      }
    );

    return NextResponse.json({
      clientIp,
      response: response.data,
      plausibleEvent,
      xff,
    });
  } catch (err) {
    console.error("❌ Failed to send Plausible event:", err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
