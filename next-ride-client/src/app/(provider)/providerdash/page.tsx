import { color } from "framer-motion";
import BikeCard from "../../../../public/providerDash/bike-card.png";
import Image from "next/image";

let cardArr = [
  { image: BikeCard, name: "Total bikes", color: "bg-red-400", value: "" },
];

export default function ProviderDash() {
  return (
    <div className="bg-white w-full h-screen  pl-56 ">
      <div className=" w-full h-screen p-10">
        <div className="flex flex-col gap-2 text-[#151D48] ">
          <h1 className="text-4xl font-fontJosefin font-semibold">
            Welcome to,
          </h1>
          <h1 className="text-7xl font-fontJosefin font-bold">
            Provider's dash
          </h1>
        </div>
        <div className="min-h-0 mt-24 flex gap-14 justify-evenly items-center flex-wrap ">
            {/* 1st ======================== */}
          <div
            style={{ boxShadow: "2px 2px 5px -1px rgba(0, 0, 0, 0.3)" }}
            className="w-full h-36 flex-1  border rounded-xl border-t-blue-500 border-t-4 flex justify-between pr-7 "
          >
            <div className="p-4  flex flex-col gap-3">
                <Image src={BikeCard} alt="load" className="w-14 h-14" />
                <h1 className="font-poppins text-xl text-gray-700">My Total Bikes</h1>
            </div>
            <div className=" flex items-center">
                <h1 className="text-5xl font-bold">123</h1>
            </div>
          </div>
          {/* 2 =============================== */}
          <div
            style={{ boxShadow: "2px 2px 5px -1px rgba(0, 0, 0, 0.3)" }}
            className="w-full h-36 flex-1  border rounded-xl border-t-green-600 border-t-4 flex justify-between pr-7 "
          >
            <div className="p-4  flex flex-col gap-3">
                <Image src={BikeCard} alt="load" className="w-14 h-14" />
                <h1 className="font-poppins text-xl text-gray-700">Total Bikes</h1>
            </div>
            <div className=" flex items-center">
                <h1 className="text-5xl font-bold">123</h1>
            </div>
          </div>
          {/* 3=========================================== */}
          <div
            style={{ boxShadow: "2px 2px 5px -1px rgba(0, 0, 0, 0.3)" }}
            className="w-full h-36 flex-1  border rounded-xl border-t-yellow-400 border-t-4 flex justify-between pr-7 "
          >
            <div className="p-4  flex flex-col gap-3">
                <Image src={BikeCard} alt="load" className="w-14 h-14" />
                <h1 className="font-poppins text-xl text-gray-700">Total Bikes</h1>
            </div>
            <div className=" flex items-center">
                <h1 className="text-5xl font-bold">123</h1>
            </div>
          </div>
          {/* 4======================================= */}
          <div
            style={{ boxShadow: "2px 2px 5px -1px rgba(0, 0, 0, 0.3)" }}
            className="w-full h-36 flex-1  border rounded-xl border-t-red-500 border-t-4 flex justify-between pr-7 "
          >
            <div className="p-4  flex flex-col gap-3">
                <Image src={BikeCard} alt="load" className="w-14 h-14" />
                <h1 className="font-poppins text-xl text-gray-700">Total Bikes</h1>
            </div>
            <div className=" flex items-center">
                <h1 className="text-5xl font-bold">123</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
