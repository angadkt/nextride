"use client";

const locations = [
  "Kochi",
];

import useStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingForm() {
  const router = useRouter()
  const {
    pickupLocation,
    pickupDate,
    dropoffDate,
    setPickupLocation,
    setPickupDate,
    setDropoffDate,
  } = useStore();
  // const [date, setDate] = useState("");
  // useEffect(() => {
  //   const today = new Date().toString().split("T")[0];
  //   console.log("date", today);
  //   setDate(today);
  // });
  const [filteredLocations, setFilteredLocations] =
    useState<string[]>(locations);
  const [showDropdown, setShowDropdown] = useState(false);

  // const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setPickupLocation(value);
  //   setFilteredLocations(
  //     locations.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
  //   );
  //   setShowDropdown(true);
  // };

  // const selectLocation = (location: string) => {
  //   setPickupLocation(location);
  //   setShowDropdown(false);
  // };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!pickupDate) setPickupDate(today);
    if (!dropoffDate) setDropoffDate(today);
  }, [pickupDate, dropoffDate, setPickupDate, setDropoffDate]);

  useEffect(() => {
    console.log("Pickup Location:", pickupLocation);
    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropoffDate);
  }, [pickupLocation, pickupDate, dropoffDate]);


  return (
    <div className="w-full h-[130px] px-5 md:px-80 bg-transparent z-10 absolute -bottom-14">
      <div className="bg-formBg w-full h-full flex flex-wrap md:flex-nowrap items-center px-5 md:px-10 rounded-2xl shadow-xl justify-center gap-3 md:gap-5">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <p>Pick-up Location</p>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="border md:w-[30rem] w-full md:h-14 h-12 rounded-xl shadow p-4"
          >
            <option value="" disabled>
              Select a location
            </option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p>Pick-up Date</p>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="border md:w-56 w-full md:h-14 h-12 rounded-xl shadow p-4"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Drop-off Date</p>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="border md:w-56 w-full md:h-14 h-12 rounded-xl shadow p-4"
          />
        </div>

        <div className="text-white">
          <button onClick={()=>router.push('/findbikes')} className="bg-[#0F0F0F] p-3 px-4 rounded-xl shadow">
            Find a vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
