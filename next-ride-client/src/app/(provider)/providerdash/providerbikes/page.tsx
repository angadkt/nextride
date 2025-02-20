"use client";
import AddBikeForm from "@/pages/provider/proBikes/addBikes";
import ViewBikes from "@/pages/provider/proViewBikes/proViewBikes";
import { useState } from "react";

export default function providerBikes() {
  const [state, setState] = useState("viewBike");
  return (
    <div className="w-full h-screen bg-[#ececec]  flex">
      <div className="w-52 h-full bg-blue-500">

      </div>
      <div className="w-full h-full  px-20 py-10 overflow-x-auto">
        <div className="w-full h-full bg-white rounded-2xl shadow-3xl p-5 flex flex-col gap-3">
          <div className=" flex  text-base font-poppins font-medium">
            <button
              className={` p-2 px-4 text-gray-500 ${(state == 'addBike')&& "bg-[#5D5FEF] text-white "}`}
              onClick={() => setState("addBike")}
            >
              ADD BIKE
            </button>
            <button
              className={` p-2 text-gray-500 px-4 ${(state == 'viewBike')&& "bg-[#5D5FEF] text-white"}`}
              onClick={() => setState("viewBike")}
            >
              VIEW BIKE
            </button>
          </div>
          <div className="w-auto h-auto p-1 overflow-scroll addbikescroll">
            {
              state === "addBike" ? <AddBikeForm /> : (state === "viewBike") && <ViewBikes />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
