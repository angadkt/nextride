"use client";

import { useEffect, useState } from "react";

export default function BookingForm() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const today = new Date().toString().split("T")[0];
    console.log("date", today);
    setDate(today);
  });
  return (
    <div className="w-full h-[130px] px-80 bg-transparent z-10 absolute -bottom-14">
      <div className="bg-formBg w-full h-full flex items-center px-10 rounded-2xl shadow-xl justify-center">
        <div className="flex gap-5 items-center ">
          <div className=" flex flex-col gap-1">
            <p>Pick-up Location</p>
            <input
              type="text"
              placeholder="search locations"
              className="border  md:w-[30rem] md:h-14 rounded-xl shadow p-4"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Pick-up Date</p>
            <input
              type="date"
              placeholder={date}
              // value={date}
              className="border  md:w-56 md:h-14 rounded-xl shadow p-4"
            />
          </div>
          <div>
            <p>Drop-off Date</p>
            <input
              type="date"
              placeholder={date}
              // value={date}
              className="border  md:w-56 md:h-14 rounded-xl shadow p-4"
            />
          </div>
          <div className="text-white">
            <button className="bg-[#0F0F0F] p-3 px-4 rounded-xl shadow">
              Find a vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
