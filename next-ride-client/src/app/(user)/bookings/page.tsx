"use client";

import Loader from "@/components/loader/loader";
import { getBookingsData } from "@/service/fetch/fetchData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormatter";
import { JSX } from "react";

// Define types for your data
interface Bike {
  name: string;
  bikeImage: string;
  // Add other bike properties as needed
}

interface BookingItem {
  bikeId: Bike;
  mainLocation: string;
  pickUpLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  // Add other booking properties as needed
}

export default function Mybookings(): JSX.Element {
  const { data, isLoading, error } = useQuery<BookingItem[], Error>({
    queryKey: ["bookingsData"],
    queryFn: getBookingsData,
  });
  console.log("data", data)
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-[#191919]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-[#191919] text-red-400 font-poppins">
        <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold">Error occurred: {error.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#191919] min-h-screen w-full px-4 md:px-6 lg:px-[112px]">
      <div className="w-full pt-20 md:pt-28 pb-12">
        <div className="mb-8">
          <h1 className="text-white font-fontJosefin text-2xl md:text-3xl font-bold">
            My Bookings
          </h1>
        </div>
        
        <div className="flex flex-col lg:flex-row w-full gap-6">
          {/* Bookings List */}
          <div className="flex flex-col gap-4 w-full lg:w-3/5">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#333] bg-[#222] hover:bg-[#282828] transition-colors duration-300 p-5 font-poppins rounded-lg shadow-md"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Bike Image */}
                    <div className="flex justify-center md:justify-start items-center">
                      <div className="bg-[#2a2a2a] p-2 rounded-lg">
                        <Image
                          src={item.bikeId.bikeImage}
                          width={180}
                          height={120}
                          alt={item.bikeId.name}
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                    
                    {/* Booking Details */}
                    <div className="text-slate-300 flex flex-col gap-3 flex-grow">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div className="flex flex-wrap gap-1 items-center">
                          <h1 className="text-white font-semibold">
                            {item.mainLocation}
                          </h1>
                          <span className="text-gray-400">-</span>
                          <h1 className="text-gray-300">
                            {item.pickUpLocation}
                          </h1>
                        </div>
                      </div>
                      
                      {/* Bike Name */}
                      <h1 className="text-xl text-white font-medium">
                        {item.bikeId.name}
                      </h1>
                      
                      {/* Dates */}
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#2a2a2a] p-4 rounded-lg">
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-sm">
                            Pick Up Date
                          </span>
                          <span className="text-white font-medium">
                            {formatDate(item.pickUpDate)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-sm">
                            Drop Off Date
                          </span>
                          <span className="text-white font-medium">
                            {formatDate(item.dropOffDate)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Status Badge - example addition */}
                      <div className="mt-2  flex justify-between">
                        {!item.isCanceled ?(<span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>) : (<span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-red-500 text-white">
                          Canceled
                        </span>)}
                        <div>
                          {!item.isCanceled ?(<button className="px-3 border border-orange-600 rounded-lg bg-[#ea580c3b] hover:shadow-[0_0_10px_#ea580c] transition duration-300" >cancel</button>) : (<button className="px-3 border border-red-600 rounded-lg hover:shadow-[0_0_10px_#dc2626] transition duration-300" >clear</button>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border border-[#333] bg-[#222] p-8 rounded-lg text-center">
                <p className="text-gray-400">No bookings found</p>
              </div>
            )}
          </div>
          
          {/* Details Panel */}
          <div className="w-full lg:w-2/5 mt-6 lg:mt-0  h-96">
            <div className="border border-[#333] bg-[#222] rounded-lg p-6 h-full">
              <h2 className="text-white text-xl font-semibold mb-4">Booking Details</h2>
              <p className="text-gray-400">Select a booking to view details</p>
              
              {/* This area can be populated with selected booking details */}
              <div className="mt-6 border-t border-[#333] pt-4">
                <div className="space-y-4">
                  {/* Placeholder content */}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Bookings</span>
                    <span className="text-white">{data?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}