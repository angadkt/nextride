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
    <div className="w-full   mt-14 md:px-[112px] px-10 py-10">
      <div className="w-full h-full ">
        <h1 className="text-2xl font-fontJosefin">Top Bikes</h1>
        <div className="w-full   flex  flex-wrap">
          {AllBikes.map((item: any) => (
            <div key={item._id} className="relative w-1/4 p-4 min-h-96">
              <div className="h-full border flex justify-center items-center flex-col bg-white border-black/30 rounded-md">
                <Image
                  src={item.bikeImage}
                  width={300}
                  height={300}
                  className="object-contain w-auto h-full"
                  alt="load"
                />
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
