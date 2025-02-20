"use client";

import BikeRequests from "@/pages/admin/AdminBikes/bikeRequests";
import { useState } from "react";

export default function ViewBikes() {
  const [state, setState] = useState("");

  return (
    <div className="bg-[#333333] w-full h-screen font-poppins">
      <div className="w-full h-20   px-20 py-3">
        {/* ==================================== */}
        <div
          style={{ boxShadow: "2px 2px 5px -1px rgba(0, 0, 0, 0.3)" }}
          className="bg-[#1c1c1c] w-full h-full flex gap-4 justify-center items-center rounded-xl  text-[#d2d2d2] text-base"
        >
          <button
            onClick={() => setState("allbikes")}
            className={`${state == "allbikes" ? "bg-[#6A42AB]" : "bg-[#333]"} py-1 px-6 rounded hover:bg-[#6A42AB]`}
          >
            All Bikes
          </button>
          <button
            onClick={() => setState("bikerequest")}
            className={`${state == "bikerequest" ? "bg-[#6A42AB]" : "bg-[#333]"} py-1 px-6 rounded hover:bg-[#6A42AB]`}
          >
            Bike requests
          </button>
          <button
            onClick={() => setState("allbikes")}
            className={`${state == "allkes" ? "bg-[#6A42AB]" : "bg-[#333]"} py-1 px-6 rounded hover:bg-[#6A42AB]`}
          >
            Loading
          </button>
          <button
            onClick={() => setState("bikerequest")}
            className={`${state == "alikes" ? "bg-[#6A42AB]" : "bg-[#333]"} py-1 px-6 rounded hover:bg-[#6A42AB]`}
          >
            Loading
          </button>
        </div>
        {/* ============================== */}
        <div>
          {state === "allbikes" ? (
            <div> </div>
          ) : state === "bikerequest" ? (
            <div>
              <BikeRequests />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
