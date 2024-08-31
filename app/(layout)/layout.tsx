import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <StreamVideoProvider>
      <main>
        <div>{children}</div>
      </main>
    </StreamVideoProvider>
  );
};

export default Layout;
