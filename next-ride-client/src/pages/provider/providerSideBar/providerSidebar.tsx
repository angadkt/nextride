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
import Profile from '../../../../public/adminIcons/adminprofile.png'
import { useState } from "react";

export default function ProviderSideBar() {
  // const [provider, setProvider] = useState({})
  const pathName = usePathname();
  const router = useRouter();
  let items: any = [
    { name: "Dashboard", icon: DashboardImage, path: "/providerdash" },
    { name: "Bookings", icon: BookingImage },
    { name: "Bikes", icon: Bikes, path: "/providerdash/providerbikes" },
    { name: "Reviews", icon: Reviews },
  ];
  if (pathName?.includes("login") || pathName?.includes("/proregister")) {
    return null;
  }
  // =========== getting specifiic provider data ===========
  const { data, isLoading, error } = useQuery({
    queryKey: ["providersdata"],
    queryFn: specificProvider,
  });
  console.log("data", data);
  // setProvider(data?.data)
  // console.log(provider)
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
  return (
    <div className="h-screen bg-white w-52 z-10 flex  items-center shadow-3xl  flex-col fixed">
      <div className="flex-grow h-full  w-full px-3">
        <div className="w-full h-20 flex  items-center gap-3">
          <span>
            <Image
              className={`transition-transform duration-300 `}
              src={Widget}
              width={40}
              height={40}
              alt="loading"
            />
          </span>
          <p className="text-lg font-semibold font-audiowide">NEXT RIDE</p>
        </div>
        <div className="w-full h-full bg-transparent flex flex-col gap-2">
          {items.map((x: any) => (
            <div
              onClick={() => router.push(`${x.path}`)}
              key={x.name}
              className="flex items-center gap-3 py-1 border px-1 rounded-lg cursor-pointer"
            >
              <Image width={25} height={25} src={x.icon} alt="load" />
              <h1 className="text-sm">{x.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow  h-full w-full flex justify-end items-end py-5 px-3 ">
        <div className="w-full   px-3 flex items-center gap-3 border rounded-lg shadow-2xl">
          <Image src={Profile} width={40} height={40} alt="load" />
          <div className="flex flex-col text-sm">
          <h1 className="text-black text-lg">{data.data.username}</h1>
          <button className="border px-2 py-1">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
