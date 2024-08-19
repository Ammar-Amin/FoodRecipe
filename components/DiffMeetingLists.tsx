"use client";
import React, { useState } from "react";
import HomeMeetCards from "./HomeMeetCards";
import { useRouter } from "next/navigation";
import MeetingPopupModal from "./MeetingPopupModal";

const DiffMeetingLists = () => {
  const [meetingState, setMeetingState] = useState<
    "newMeeting" | "joinMeeting" | "scheduleMeeting" | undefined
  >();
  const router = useRouter();

  const createMeeting = () => {};

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
