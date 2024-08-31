"use client";
import React, { useState } from "react";
import HomeMeetCards from "./HomeMeetCards";
import { useRouter } from "next/navigation";
import MeetingPopupModal from "./MeetingPopupModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

const DiffMeetingLists = () => {
  const [meetingState, setMeetingState] = useState<
    "newMeeting" | "joinMeeting" | "scheduleMeeting" | undefined
  >();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date & time" });
        return;
      }

      const id = crypto.randomUUID();
      // console.log(id);
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call :(");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "New Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      // console.log("Call : ", call);
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: "Meeting created successfully" });
    } catch (err) {
      console.log("Creating Meeting Error: ", err);
      toast({ title: "Failed to create the meeting" });
    }
  };

  return (
    <section
      className="w-full grid grid-cols-1 md:grid-cols-2
     xl:grid-cols-4 gap-5 lg:gap-7 xl:pt-3"
    >
      <HomeMeetCards
        icon="#"
        title="New Meeting"
        desc="Start an Instant Meeting"
        color="bg-blue-600"
        handleClick={() => setMeetingState("newMeeting")}
      />
      <HomeMeetCards
        icon="#"
        title="Join Meeting"
        desc="Via Invitation Link"
        color="bg-yellow-600"
        handleClick={() => setMeetingState("joinMeeting")}
      />
      <HomeMeetCards
        icon="#"
        title="Schedule Meeting"
        desc="Plan your Meeting"
        color="bg-indigo-600"
        handleClick={() => setMeetingState("scheduleMeeting")}
      />
      <HomeMeetCards
        icon="#"
        title="View Recordings"
        desc="Your Recordings"
        color="bg-lime-600"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingPopupModal
        isOpen={meetingState == "newMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default DiffMeetingLists;
