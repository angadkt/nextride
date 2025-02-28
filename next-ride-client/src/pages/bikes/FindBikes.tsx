"use client";

import { axiosInstance } from "@/Axios/axiosInstance";
import Loader from "@/components/loader/loader";
import { findBikes, getAllApprovedBikes } from "@/service/fetch/fetchData";
import useStore from "@/store/userStore";
import { _id } from "@next-auth/mongodb-adapter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FindbikesComponent() {
  const {
    pickupLocation,
    pickupDate,
    dropoffDate,
    setPickupDate,
    setDropoffDate,
    pickUpTime,
    dropOfTime,
    setPicktime,
    setdropOfTime,
  } = useStore();
  const router = useRouter();
  const [selectedLocations, setSelectedLocations] = useState<{
    [key: string]: string[];
  }>({});
  console.log("console loc check",selectedLocations)
  //fetching bike datas
  let location = pickupLocation;
  // ================================================
  const { data, isLoading, error } = useQuery({
    queryKey: ["bikes", location],
    queryFn: async () => {
      if (!location) return []; // Avoid making an API call if no location is provided
      return findBikes(location);
    },
    enabled: !!pickupLocation, // Ensures the query only runs when pickupLocation is available
  });
  console.log("hello", data?.data)
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    toast(`fetching unsuccessful.${error.message}`);
    return (
      <div className="w-full h-screen">
        <h1>{error.message}</h1>
      </div>
    );
  }
  //=================================================================

  //handle
  const handleLocationChange = (bikeId: string, location: string) => {
    setSelectedLocations((prev) => ({ ...prev, [bikeId]: [location] }));
  };

  //handleSubmit


  return (
    <div className="w-full h-screen px-[110px] pt-20 pb-10">
      <div className="w-full h-full pt-5 flex gap-5 md:flex-nowrap flex-wrap">
        <div className="w-1/4  rounded-lg ">
          <div className="border p-3 rounded-lg">
          <div className="">
            <h1 className="font-fontJosefin text-2xl">Filter</h1>
          </div>
          <div className="flex flex-col gap-10 font-poppins text-base">
            {/* =============================== */}
            <div className="">
              <div className="flex flex-col ">
                <label>Pick up Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  className="border border-slate-300 bg-slate-50 p-2 rounded-lg"
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Time</label>
                {/* time picker */}
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="09:00"
                    max="18:00"
                    value={pickUpTime}
                    onChange={(e) => setPicktime(e.target.value)}
                    required
                  />
                </div>
                {/* ======================== */}
              </div>
            </div>
            {/* ==================================== */}
            <div className="flex flex-col  ">
              <div className="flex flex-col ">
                <label>Drop of date</label>
                <input
                  type="date"
                  value={dropoffDate}
                  min={new Date().toISOString().split("T")[0]}
                  className="border border-slate-300 bg-slate-50 p-2 rounded-lg"
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Time</label>
                {/* time picker */}
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="09:00"
                    max="18:00"
                    value={dropOfTime}
                    onChange={(e) => setdropOfTime(e.target.value)}
                    required
                  />
                </div>
                {/* ================================== */}
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="w-full h-auto  bg-transparent rounded-lg p-2 flex flex-wrap items-start  gap-3 overflow-scroll scrollbar-none">
          {data?.data.length === 0 && (
            <h1>No Bikes available in the {location}</h1>
          )}
          {data?.data?.map((item: any) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-md w-80"
            >
              <div className="h-auto flex justify-center items-center  ">
                <Image
                  src={item.bikeImage}
                  width={400}
                  height={0}
                  alt="load"
                  className="rounded h-[200px] w-auto"
                />
              </div>

              <div className="mt-3">
                <h1 className="font-semibold">{item.name}</h1>
                <h1 className="text-gray-600">{item.brand}</h1>
                <h1 className="text-gray-500">Year: {item.year}</h1>
                <h1 className="text-gray-500">KM Driven: {item.kmDriven}</h1>
                <h1 className="text-gray-500">Mileage: {item.mileage} km/l</h1>
              </div>

              {/* Pickup Location Dropdown */}
              <div className="mt-3">
                <label className="block text-sm font-medium">
                  Pickup Location
                </label>
                <select
                  className="border p-2 w-full rounded"
                  value={selectedLocations[item._id] || ""}
                  onChange={(e) =>
                    handleLocationChange(item._id, e.target.value)
                  }
                >
                  <option value="">Select Location</option>
                  {item.pickUpLocations.map(
                    (location: string, index: number) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => router.push(`/findbikes/${item._id}`)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
