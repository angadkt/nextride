"use client";

import Loader from "@/components/loader/loader";
import { getAllApprovedBikes } from "@/service/fetch/fetchData";
import { _id } from "@next-auth/mongodb-adapter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FindbikesComponent() {
  const router = useRouter()
    const [selectedLocations, setSelectedLocations] = useState<{ [key: string]: string[] }>({});
  //fetching bike datas
  const { data, isLoading, error } = useQuery({
    queryKey: ["bikes"],
    queryFn: getAllApprovedBikes,
  });
  console.log("hehehe", data?.data);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
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
  const handleBooking = (bikeId: string) => {
    // const selectedLocation = selectedLocations[bikeId];
    // if (!selectedLocation) {
    //   alert("Please select a pickup location.");
    //   return;
    // }
    // console.log(`Bike ${bikeId} booked at ${selectedLocation}`);
    // alert(`Bike booked at ${selectedLocation}`);
  };

  return (
    <div className="w-full h-screen px-[110px] pt-20 pb-10">
    <div className="w-full h-full pt-5 flex gap-5 md:flex-nowrap flex-wrap">
      <div className="w-1/4 border rounded-lg shadow-4xl"></div>

      <div className="w-full border bg-white rounded-lg p-2 flex flex-wrap items-start shadow-4xl gap-3">
        {data?.data.map((item: any) => (
          <div key={item._id} className="border p-4 rounded-lg shadow-md w-80">
            <div className="h-auto flex justify-center items-center  ">
              <Image src={item.bikeImage} width={400} height={0} alt="load" className="rounded h-[200px] w-auto" />
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
              <label className="block text-sm font-medium">Pickup Location</label>
              <select
                className="border p-2 w-full rounded"
                value={selectedLocations[item._id] || ""}
                onChange={(e) => handleLocationChange(item._id, e.target.value)}
              >
                <option value="">Select Location</option>
                {item.pickUpLocations.map((location: string, index: number) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() =>router.push(`/findbikes/${item._id}`)}
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
