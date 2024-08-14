"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="sticky left-0 top-0 h-screen w-fit flex flex-col justify-between bg-slate-900 p-6 pt-28 text-white max-sm:hidden lg:w-[270px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link, i) => {
          const isActive = path === link.path;

          return (
            <Link
              key={i}
              href={link.path}
              className={cn(
                "flex gap-4 justify-start items-center p-4 rounded-lg lg:text-lg",
                {
                  "bg-blue-600": isActive,
                }
              )}
            >
              <span>{link.img}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
