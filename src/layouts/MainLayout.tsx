import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

type DashboardProps = {
  children: ReactNode;
};

const MainLayout: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-10">{children}</div>
    </div>
  );
};

export default MainLayout;
