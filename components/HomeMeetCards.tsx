"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface HomeCardProps {
  icon: string;
  title: string;
  desc: string;
  color: string;
  handleClick: () => void;
}

const HomeMeetCards = ({
  icon,
  title,
  desc,
  color,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 rounded-xl w-full xl:w-[270px] h-[170px] md:min-h-[260px] flex flex-col justify-between cursor-pointer",
        color
      )}
      onClick={handleClick}
    >
      <div>
        <span className="px-4 py-3 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
          {icon}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-lg font-normal">{desc}</span>
      </div>
    </div>
  );
};

export default HomeMeetCards;
