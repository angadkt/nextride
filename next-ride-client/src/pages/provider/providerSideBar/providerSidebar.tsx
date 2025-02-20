"use client";

import Image from "next/image";
import Widget from "../../../../public/providerIcons/providerWidget.png";
import DashboardImage from "../../../../public/providerIcons/dash.png";
import BookingImage from "../../../../public/providerIcons/booking.png";
import Bikes from "../../../../public/providerIcons/bikes.png";
import Reviews from "../../../../public/providerIcons/reviews.png";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { specificProvider } from "@/service/fetch/fetchData";
import Loader from "@/components/loader/loader";
import Profile from "../../../../public/adminIcons/adminprofile.png";
import { useState } from "react";
import { axiosInstance } from "@/Axios/axiosInstance";
import toast from "react-hot-toast";

export default function ProviderSideBar() {
  const pathName = usePathname();
  const router = useRouter();
  let items: any = [
    {
      name: "Dashboard",
      icon: DashboardImage,
      path: "/providerdash",
      color: "#5D5FEF",
    },
    { name: "Bookings", icon: BookingImage,path:"/providerdash/probooking", color: "#5D5FEF" },
    {
      name: "Bikes",
      icon: Bikes,
      path: "/providerdash/providerbikes",
      color: "#5D5FEF",
    },
    {
      name: "Reviews",
      icon: Reviews,
      path: "/providerdash/providerreview",
      color: "#5D5FEF",
    },
  ];

  // =========== getting specifiic provider data ===========
  const { data, isLoading, error } = useQuery({
    queryKey: ["providersdata"],
    queryFn: specificProvider,
  });

  if (isLoading)
    return (
      <div className="bg-[#333333] h-screen flex justify-center items-center">
        <div className="w-20 h-20">
          <Loader />
        </div>
      </div>
    );
  if (error) {
    return <div className="bg-[#333333] h-screen">Error:{error.message}</div>;
  }

  if (pathName?.includes("login") || pathName?.includes("/proregister")) {
    return null;
  }

  const handleLogout = async () => {
    const response = await axiosInstance.get("/provider/providerlogout");
    router.push("/login");
  };

  return (
    <div
      style={{ boxShadow: "2px 2px 5px -1px rgba(0, 0, 0, 0.3)" }}
      className="h-screen bg-white w-56 z-10 flex  items-center   flex-col fixed"
    >
      <div className="flex-grow h-full  w-full px-3">
        <div className="w-full h-20 flex  items-center gap-3 border-b border-">
          <span>
            <Image
              className={`transition-transform duration-300 `}
              src={Widget}
              width={40}
              height={40}
              alt="loading"
            />
          </span>
          <p className="text-xl text-[#151D48] font-semibold font-audiowide tracking-wider">
            NEXT RIDE
          </p>
        </div>
        <div className="w-full h-full bg-transparent flex flex-col gap-4 mt-10">
          {items.map((x: any) => (
            <div
              onClick={() => router.push(`${x.path}`)}
              key={x.name}
              className={` tracking-wider font-poppins font-base flex items-center gap-3 py-2  px-3 rounded-lg cursor-pointer text-gray-500 ${
                pathName == x.path && "bg-[#5D5FEF] text-white"
              } `}
            >
              <Image width={25} height={25} src={x.icon} alt="load" />
              <h1 className="text-base">{x.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow  h-full w-full flex justify-end items-end py-5 px-3 ">
        <div className="w-full   px-3 flex items-center gap-3 border rounded-lg shadow-2xl">
          <Image src={Profile} width={40} height={40} alt="load" />
          <div className="flex flex-col text-sm">
            <h1 className="text-black text-lg">{data.data.username}</h1>
            <button onClick={handleLogout} className="border px-2 py-1">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
