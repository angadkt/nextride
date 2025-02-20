import Navbar from "@/components/navbar/navBar";
import React from "react";

export default function UserLayot({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning={true}>
      <Navbar />
      <main className="w-full h-screen">{children}</main>
    </div>
  );
}
