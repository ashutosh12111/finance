type Props = {
  children: React.ReactNode;
};

import React from "react";
import Header from "@/components/Header";

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-3">{children}</main>
    </>
  );
};
export default DashboardLayout;
