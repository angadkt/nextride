"use client";

import BookingForm from "../bookingForm/bookingform";
import Bike from '../../../public/images/bike-light.png'
import Image from "next/image";


export default function Hero() {
 

  return (
    <div className="w-full h-screen bg-[#120F10]   relative flex justify-center ">
        <p className="text-white md:mt-60 font-fontKoushan text-5xl -tracking-tighter">Unlock your ride to freedom</p>
         <Image width={1150} height={1200}  src={Bike} alt="ooomp" className="absolute -bottom-32 "/>
      <BookingForm />
    </div>
  );
}
