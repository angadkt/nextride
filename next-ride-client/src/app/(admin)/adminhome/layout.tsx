import React from "react";
import SideBar from "@/pages/admin/adminSideBar/sideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning={true} className=" flex w-full h-screen bg-[#333333]">
      <SideBar />
      <main className="w-full h-screen">{children}</main>
    </div>
  );
}
