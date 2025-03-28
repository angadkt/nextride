"use client";

import PriceModal from "@/components/bikePriceModal/adminPriceModal";
import Loader from "@/components/loader/loader";
import ReqTableModal from "@/components/reqTableModal/reqTableModal";
import { getAllpendingBikes } from "@/service/fetch/fetchData";
import useStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BikeData {
  _id:any;
  DlNumber: string;
  bikeImage: string;
  brand: string;
  engine: string;
  isApproved: boolean;
  isavailable: string;
  kmDriven: string;
  mainLocation: string;
  mileage: string;
  name: string;
  pickUpLocations: string[];
  price: number;
  providersId: string;
  quantityAvailable: number;
  registrationCertificate: string;
  __v: number;
}

export default function BikeRequests() {
  const [selectedReq , setSelectedReq] = useState()
  const { isClose, handleIsClose } = useStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["pending-bikes"],
    queryFn: getAllpendingBikes,
  });

  // console.log("req data" , )
  // setReqCount(data?.data.length)
  console.log("total bike data", data?.data)

  if (isLoading)
    return (
      <div className="bg-[#333333] h-screen flex justify-center items-center">
        <div className="w-20 h-20">
          <Loader />
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="bg-[#333333] h-screen text-red-500 p-4">
        Error: {error.message}
      </div>
    );
  }

  if(data?.data.length === 0){
    return (
      <div>
        <h1>No data found</h1>
      </div>
    )
  }

  const handleClick= (req:any) => {
    setSelectedReq(req)
    handleIsClose()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-start text-white">
        Bikes Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-900 shadow-lg bg-[#3333] text-white rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2x`">No</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Engine</th>
              <th className="px-4 py-2">Km Driven</th>
              <th className="px-4 py-2">Mileage</th>
              <th className="px-4 py-2">DL Number</th>
              <th className="px-4 py-2">Main Location</th>
              <th className="px-4 py-2">Bike Image</th>
              <th className="px-4 py-2">RC</th>
              <th className="px-4 py-2">advance</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((bike: BikeData, index: number) => (
              <tr
                key={bike._id}
                className="border-b border-blue-800 hover:bg-blue-50 hover:text-black transition h-20"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{bike.brand}</td>
                <td className="px-4 py-2 text-center">{bike.name}</td>
                <td className="px-4 py-2 text-center">{bike.engine}</td>
                <td className="px-4 py-2 text-center">{bike.kmDriven}</td>
                <td className="px-4 py-2 text-center">{bike.mileage}</td>
                <td className="px-4 py-2 text-center">{bike.DlNumber}</td>
                <td className="px-4 py-2 text-center">{bike.mainLocation}</td>
                <td className="px-4 py-2 text-center">
                  <Image
                    src={bike.bikeImage}
                    width={50}
                    height={50}
                    alt="Bike Image"
                    className="rounded-lg shadow-md"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <Image
                    src={bike.registrationCertificate}
                    width={50}
                    height={50}
                    alt="RC Image"
                    className="rounded-lg shadow-md"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={()=>handleClick(bike)}
                    className=" text-sm px-2 py-1  bg-green-500 text-white"
                  >
                    Approve Vehicle
                  </button>
                </td>
                {!isClose && <ReqTableModal bikeData={selectedReq} />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
