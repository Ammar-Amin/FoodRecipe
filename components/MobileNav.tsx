"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[270px]">
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 30 30"
            className="cursor-pointer sm:hidden"
          >
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
          </svg>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-slate-900">
          <Link href="/" className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 64 64"
            >
              <circle cx="32" cy="32" r="23" fill="#37d0ee"></circle>
              <path
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="3"
                d="M15.016,22.426c1.835-3.242,4.571-5.909,7.865-7.659"
              ></path>
              <ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse>
              <path
                fill="#fff"
                d="M32,14c2.577,0,4.674-1.957,4.946-4.461C35.352,9.19,33.699,9,32,9 C19.297,9,9,19.297,9,32c0,1.699,0.19,3.352,0.539,4.946C12.044,36.674,14,34.577,14,32C14,22.075,22.075,14,32,14z"
                opacity=".3"
              ></path>
              <path
                d="M54.461,27.054C51.956,27.326,50,29.423,50,32c0,9.925-8.075,18-18,18 c-2.577,0-4.674,1.957-4.946,4.461C28.648,54.81,30.301,55,32,55c12.703,0,23-10.297,23-23C55,30.301,54.81,28.648,54.461,27.054z"
                opacity=".15"
              ></path>
              <g>
                <path
                  fill="#fff"
                  d="M36,37.992c0,0.56-0.454,1.014-1.014,1.014h-14.79c-1.764,0-3.194-1.439-3.194-3.214v-9.776 c0-0.56,0.454-1.014,1.014-1.014h14.79c1.764,0,3.194,1.439,3.194,3.214V37.992z"
                ></path>
                <path
                  fill="#fff"
                  d="M43.765,38.866l-5.396-3.602c-0.229-0.153-0.367-0.416-0.367-0.698v-5.123 c0-0.282,0.138-0.546,0.367-0.698l5.396-3.602c0.532-0.355,1.232,0.042,1.232,0.698v12.327 C44.997,38.824,44.297,39.221,43.765,38.866z"
                ></path>
              </g>
            </svg>
            <span className="text-2xl font-bold">Boom</span>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="h-full flex flex-col gap-6 pt-6 ">
                {sidebarLinks.map((link, i) => {
                  const isActive = pathname === link.path;

                  return (
                    <SheetClose key={i} asChild>
                      <Link
                        href={link.path}
                        className={cn(
                          "flex gap-4 justify-start items-center p-4 rounded-lg",
                          {
                            "bg-blue-600": isActive,
                          }
                        )}
                      >
                        <span>{link.img}</span>
                        <span>{link.label}</span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
