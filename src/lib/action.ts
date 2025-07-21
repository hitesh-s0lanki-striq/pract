"use server";

import { PlausibleClient } from "./plausible-client";
import { PlausibleEventPayloadType } from "./plausible.types";

export const trackPlausibleEvent = async (
  userAgent?: string,
  payload?: PlausibleEventPayloadType
) => {
  try {
    // Call the client method to add the subscriber
    await PlausibleClient.upsertSubscriber(userAgent, payload);
    return {
      message: `Event tracked successfully for subscriber ${userAgent}`,
      status: 200,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error, "Error reported from plausible api route");
    return { error: error.message, status: 500 };
  }
};
