"use client";

import BikeRequests from "@/pages/admin/AdminBikes/bikeRequests";
import useStore from "@/store/userStore";
import { useState } from "react";

export default function ViewBikes() {
  // const { reqCount } = useStore()
  const [state, setState] = useState("bikerequest");

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
            className={`${state == "allbikes" ? "border-b-4 border-[#6A42AB]" : "bg-none"}  px-6 h-full rounded `}
          >
            All Bikes
          </button>
          <button
            onClick={() => setState("bikerequest")}
            className={`${state == "bikerequest" ? "border-b-4 border-[#6A42AB]" : "bg-none"}  px-6 rounded  h-full`}
          >
            Bike requests 
          </button>
          <button
            onClick={() => setState("allkesr")}
            className={`${state == "allkesr" ? "border-b-4 border-[#6A42AB]" : "bg-none"}  px-6 rounded  h-full`}
          >
            Loading
          </button>
          <button
            onClick={() => setState("alikes")}
            className={`${state == "alikes" ? "border-b-4 border-[#6A42AB]" : "bg-none"}  px-6 rounded  h-full text-center`}
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
