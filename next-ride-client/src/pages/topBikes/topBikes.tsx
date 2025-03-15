"use client";

import Loader from "@/components/loader/loader";
import { getAllApprovedBikes, getTopBikes } from "@/service/fetch/fetchData";
import useStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function TopBikesSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gettopbikes"],
    queryFn: getTopBikes,
  });

  console.log("data", data?.topBikes);
  const AllBikes = data?.topBikes   ;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="w-full mt-14 px-6 md:px-[112px] py-10">
    <div className="w-full">
      <h1 className="text-3xl font-semibold font-fontJosefin mb-6">Top Bikes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {AllBikes.map((item: any) => (
          <div key={item._id} className="relative p-4 min-h-96">
            <div className="h-full border border-gray-300 flex flex-col items-center bg-white rounded-lg shadow-md p-4">
              <Image
                src={item.bikeImage}
                width={250}
                height={250}
                className="object-contain w-full h-56"
                alt="Bike Image"
              />
              <h2 className="mt-4 text-lg font-medium">{item.bikeName}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
}
