"use client";
import React, { useState } from "react";
import HomeMeetCards from "./HomeMeetCards";
import { useRouter } from "next/navigation";
import MeetingPopupModal from "./MeetingPopupModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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

      {!callDetails ? (
        <MeetingPopupModal
          isOpen={meetingState == "scheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div>
            <label>About The Meeting</label>
            <Textarea
              placeholder="Add description"
              className="mt-2 mb-4 bg-slate-800 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />

            <div className="flex flex-col">
              <label>Select Date and Time : </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="hh:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="mt-2 p-2 w-full bg-slate-800 rounded"
              />
            </div>
          </div>
        </MeetingPopupModal>
      ) : (
        <MeetingPopupModal
          isOpen={meetingState == "scheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied to clipboard" });
            setMeetingState(undefined);
          }}
          image="/checked.svg"
          buttonText="Copy Meeting Link"
          buttonIcon="/copy.svg"
        />
      )}

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
