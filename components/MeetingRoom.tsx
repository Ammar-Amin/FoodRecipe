import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "speaker-left" | "speaker-right" | "grid";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  // personal = true, !'personal' = false, !!'personal' = true
  // undefined = false, !undefined = true, !!undefined = false

  const CallLayout = () => {
    switch (layout) {
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <PaginatedGridLayout />;
    }
  };

  return (
    <section className="relative overflow-hidden w-full h-screen p-4">
      <div className="relative size-full flex-center">
        <div className="size-full max-w-[1000px]  flex items-center">
          <CallLayout />
        </div>
        <div
          className={cn("hidden ml-2 h-[calc(100vh-90px)]", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex-center gap-4">
        <CallControls />

        <DropdownMenu>
          <div className="flex items-center mr-1">
            <DropdownMenuTrigger className="bg-slate-800 p-2 rounded-full hover:bg-slate-700">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            {["Speaker-Left", "Speaker-Right", "Grid"].map((item) => {
              return (
                <div key={item}>
                  <DropdownMenuItem
                    className="cursor-pointer bg-slate-900"
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                  {item !== "Grid" && <DropdownMenuSeparator />}
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="bg-slate-800 p-2 rounded-full hover:bg-slate-700">
            <Users size={20} />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
