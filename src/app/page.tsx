"use client";

import { Button } from "@/components/ui/button";
// import { trackPlausibleEvent } from "@/lib/action";
// import { PlausibleEventNames } from "@/lib/plausible.types";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    setLoading(true);
    // const result = await trackPlausibleEvent(navigator.userAgent, {
    //   name: PlausibleEventNames.TEST_EVENT_LISTENER,
    //   url: window.location.href,
    //   props: { org_name: "This is my test Org" },
    // });
    try {
      const result = await axios
        .post("/api/track-event")
        .then((response) => response.data);
      setResponse(JSON.stringify(result));
    } catch (error: any) {
      console.log("Error: ", error);
      setResponse(
        JSON.stringify({
          error: error.message,
        })
      );
    }
    setLoading(false);
  };

  return (
    <div className=" h-screen flex justify-center items-center flex-col gap-10">
      <p className="text-sm w-1/2">{response}</p>
      <Button onClick={handleClick} disabled={loading}>
        Track Event
      </Button>
    </div>
  );
};

export default Page;
