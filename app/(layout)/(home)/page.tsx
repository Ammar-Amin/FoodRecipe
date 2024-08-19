import DiffMeetingLists from "@/components/DiffMeetingLists";
import React from "react";

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="size-full flex flex-col gap-10 text-white mt-1 lg:mt-4">
      <div className="h-[300px] w-full bg-slate-800 bg-hero bg-cover rounded-lg">
        <div className="h-full flex flex-col justify-between max-md:px-5 max-md:py-8 md:px-7 md:py-8 lg:p-11">
          <h2 className="bg-slate-700 rounded max-w-[270px] text-center py-2">
            Upcoming Meeting at 11.12 am
          </h2>
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <span className="text-lg font-medium lg:text-[22px] text-sky-200">
              {date}
            </span>
          </div>
        </div>
      </div>

      <DiffMeetingLists />
    </section>
  );
};

export default Home;
