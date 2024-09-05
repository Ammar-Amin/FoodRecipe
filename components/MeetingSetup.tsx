"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  isSetupComplete,
}: {
  isSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCameraOn, setIsMicCameraOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be use inside StreamCall Component");
  }
  useEffect(() => {
    if (isMicCameraOn) {
      call?.camera.enable();
      call?.microphone.enable();
    } else {
      call?.camera.disable();
      call?.microphone.disable();
    }
  }, [isMicCameraOn, call?.camera, call?.microphone]);

  return (
    <div className="w-full h-screen flex-center flex-col gap-3 text-white">
      <h1 className="font-semibold text-2xl">Setup</h1>
      <VideoPreview />
      <div className="flex-center gap-3 h-16">
        <label className="flex-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCameraOn}
            onChange={(e) => setIsMicCameraOn(e.target.checked)}
          />
          Join with Mic & Camera On
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-lg bg-green-700 hover:bg-green-800 text-white"
        onClick={() => {
          call.join();
          isSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
