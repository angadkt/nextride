'use client'

import Loader from "@/components/loader/loader";
import { getMyBikes } from "@/service/fetch/fetchData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function ViewBikes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allbikes"],
    queryFn: getMyBikes,
  });
  console.log("data", data?.data);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex justify-center items-center overflow-x-auto px-10">
       <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-slate-500 text-white">
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Brand</th>
            <th className="px-4 py-2 border">Main Location</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Image</th>
            {/* <th className="px-4 py-2 border"></th> */}
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item:any, index:any) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border text-center">{item.name}</td>
              <td className="px-4 py-2 border text-center">{item.brand}</td>
              <td className="px-4 py-2 border text-center">{item.mainLocation}</td>
              <td className="px-4 py-2 border text-center">{item.year}</td>
              <td className="px-4 py-2 border text-center">{ (item.isApproved)? <p className=" py-1 bg-green-500 rounded-lg" >live</p> : <p className=" py-1 bg-yellow-500 rounded-lg" >Pending</p>  }</td>
              <td className="h-auto flex justify-center items-center px-4 py-2 border text-center"><Image src={item.bikeImage} width={100} height={0} alt="load" className="w-auto h-auto" /></td>
              {/* <td className="px-4 py-2 border text-center">-</td> */}
            </tr>
          ))}   
        </tbody>
        
      </table>
    </div>
  );
}
