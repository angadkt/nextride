"use client";
import AddBikeForm from "@/pages/provider/proBikes/addBikes";
import { useState } from "react";

export default function providerBikes() {
  const [state, setState] = useState("viewBike");
  return (
    <div className="w-full h-screen bg-[#ececec]  flex">
      <div className="w-48 h-full bg-blue-500"></div>
      <div className="w-full h-full  px-20 py-10">
        <div className="w-full h-full bg-white rounded-2xl shadow-3xl p-5 flex flex-col gap-3">
          <div className=" flex  text-lg">
            <button
              className="border p-2 px-4"
              onClick={() => setState("addBike")}
            >
              ADD BIKE
            </button>
            <button
              className="border p-2 px-4"
              onClick={() => setState("viewBike")}
            >
              VIEW BIKE
            </button>
          </div>
          <div className="w-auto h-auto p-1 overflow-scroll">
            {
              state === "addBike" ? <AddBikeForm /> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}
