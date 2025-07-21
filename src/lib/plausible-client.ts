import { plausibleAxiosInstance } from "@/lib/axios-instance";
import { PlausibleEventPayloadType } from "./plausible.types";

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

    const response = await plausibleAxiosInstance(userAgent).post("/event", {
      ...event,
      domain: PlausibleClient.plausibleDomain,
    });

    return {
      domain: PlausibleClient.plausibleDomain,
      response: response.data,
      status: response.status,
      userAgent,
      event,
    };
  }
}
