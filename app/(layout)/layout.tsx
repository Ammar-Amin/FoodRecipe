import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
};

export default Layout;
