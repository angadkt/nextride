import React from "react";
import SideBar from "@/pages/admin/adminSideBar/sideBar";

export default function AdminLayout({ children, }: { children: React.ReactNode }){
    return(
        <div className="admin-layout">
      {/* <header className="admin-header"> */}
        {/* Admin Header (Navigation, Profile, etc.) */}
        {/* <nav>
          <ul>
            <li><a href="/admin/dashboard">Dashboard</a></li>
            <li><a href="/admin/settings">Settings</a></li>
          </ul>
        </nav> */}
      {/* </header> */}

        <SideBar />
      <main className="admin-main">
        {/* <h1>Admin Section</h1> */}
        {/* Admin Pages will be injected here */}
        {children}
      </main>

      {/* <footer className="admin-footer"> */}
        {/* Admin Footer */}
        {/* <p>Admin Footer</p>
      </footer> */}
    </div>
    )
}