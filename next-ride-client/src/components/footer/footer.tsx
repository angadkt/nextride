"use client";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineCall } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#151213] w-full h-80 mt-14 rounded-tr-[5.5rem] rounded-tl-[5.5rem] px-[112px] ">
      <div className="w-full h-full e pt-10 flex flex-col justify-between">
        <div className="text-white  text-xl">
          <h1>See how we can help</h1>
          <h1>you, get in touch today.</h1>
          <span className="flex flex-col  items-start text-center text-sm gap-3 mt-3">
            <div className="border px-3 py-1 rounded-xl">
              nextrinde@gmail.com
            </div>
            <div className="border px-5 py-1 rounded-xl">+91-9876543678</div>
          </span>
        </div>
        <div className=" h-28 flex flex-col">
          <div className="h-12  border-b border-gray-300 text-white text-center">
            <p>© 2025 NextRide. All rights reserved.</p>
          </div>
          <div className="h-full  flex">
            <div className="text-white text-3xl flex items-center h-full font-audiowide  flex-1">
              NEXT RIDE
            </div>
            <div className="flex-1  flex justify-center items-center text-white text-lg gap-4">
              <p>about</p>
              <p>contact us</p>
              <p>terms & conditions</p>
            </div>
            <div className="flex-1  flex items-center justify-end gap-2">
              <p className="text-white text-2xl">
                <FaWhatsapp />
              </p>
              <p className="text-white text-2xl">
                <MdOutlineCall />
              </p>
              <p className="text-white text-2xl">
                <FaInstagram />
              </p>
              <p className="text-white text-2xl">
                <IoMailOpenOutline />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
