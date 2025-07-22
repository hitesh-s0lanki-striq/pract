import { PlausibleEventPayloadType } from "./plausible.types";
import axios from "axios";

export class PlausibleClient {
  private static plausibleDomain: string = process.env.PLAUSIBLE_DOMAIN!;

  static async upsertSubscriber(
    userAgent?: string,
    event?: PlausibleEventPayloadType
  ) {
    if (!PlausibleClient.plausibleDomain) {
      throw new Error("PLAUSIBLE_DOMAIN environment variable is not set.");
    }

    if (!userAgent) {
      throw new Error("User-Agent header is required.");
    }

    if (!event || !event.name) {
      throw new Error("Event name and properties are required.");
    }

    const response = await axios.post(
      "https://plausible.io/api/event",
      {
        ...event,
        domain: PlausibleClient.plausibleDomain,
      },
      {
        headers: {
          "User-Agent": userAgent,
          "Content-Type": "application/json",
          "X-Debug-Request": true,
        },
      }
    );

    return {
      domain: PlausibleClient.plausibleDomain,
      response: response.data,
      status: response.status,
      userAgent,
      event,
    };
  }
}
