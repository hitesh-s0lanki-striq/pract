import axios from "axios";

export const plausibleAxiosInstance = (userAgent: string) => {
  return axios.create({
    baseURL: process.env.PLAUSIBLE_API_URL,
    headers: {
      "User-Agent": userAgent,
      "Content-Type": "application/json",
    },
  });
};
