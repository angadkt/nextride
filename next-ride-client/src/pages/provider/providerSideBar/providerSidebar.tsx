"use client";

import Image from "next/image";
import Widget from "../../../../public/providerIcons/providerWidget.png";
import DashboardImage from "../../../../public/providerIcons/dash.png"
import BookingImage from "../../../../public/providerIcons/booking.png"
import Bikes from "../../../../public/providerIcons/bikes.png"
import Reviews from "../../../../public/providerIcons/reviews.png"

export default function ProviderSideBar() {
  let items:any = [
    { name: "Dashboard", icon: DashboardImage },
    { name: "Bookings", icon: BookingImage },
    { name: "Bikes", icon:Bikes },
    { name: "Reviews", icon:Reviews },
  ];
  return (
    <div className="h-screen bg-white w-48 z-10 flex  items-center shadow-3xl  flex-col fixed">
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
          {items.map((x:any) => (
            <div key={x.name} className="flex items-center gap-3 py-1 border px-1 rounded-lg">
                <Image width={25} height={25} src={x.icon} alt="load" />
                <h1 className="text-sm">{x.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow bg-yellow-300 h-full w-full"></div>
    </div>
  );
}
