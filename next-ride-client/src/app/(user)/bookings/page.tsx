"use client";

import Loader from "@/components/loader/loader";
import { getBookingsData } from "@/service/fetch/fetchData";
import { useQuery } from "@tanstack/react-query";
import LocationIcon from "../../../../public/usericons/location.png";
import Image from "next/image";

export default function Mybookings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookingsData"],
    queryFn: getBookingsData,
  });
  console.log("Data", data);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Error occured : {error.message}</h1>
      </div>
    );
  }
  return (
    <div className="bg-[#191919] w-full h-screen px-[112px]">
      <div className="w-full h-full pt-28 ">
        <div className="">
          <h1 className="text-white font-fontJosefin text-3xl">My Bookings</h1>
        </div>
        <div className="flex flex-col gap-4">
          {data?.map((item: any, index: number) => (
            <div
              key={index + 1}
              className="border border-white  py-5 px-5 font-poppins rounded-lg flex flex-col gap-2"
            >
              <div className="flex gap-1 ">
                <Image src={LocationIcon} width={25} height={6} alt="load" />
                <h1 className="text-slate-300 font-semibold text-xl">
                  {item.mainLocation}
                </h1>
                <h1 className="text-slate-300 font-semibold text-xl">-</h1>
                <h1 className="text-slate-300 font-base text-lg">
                  {item.pickUpLocation}
                </h1>
              </div>
              <div className="flex gap-10">
              <div>
              <Image src={item.bikeId.bikeImage} width={200} height={200} alt="load" />
              </div>
              <div className=" text-slate-300 flex flex-col gap-1">
                <h1 className="text-xl">{item.bikeId.name}</h1>
                <h1 className="">{item.pickUpDate}</h1>
                <h1 className="">{item.dropOffDate}</h1>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
