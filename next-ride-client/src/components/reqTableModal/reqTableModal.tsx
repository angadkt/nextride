"use client";

import { axiosInstance } from "@/Axios/axiosInstance";
import useStore from "@/store/userStore";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReqTableModal({ bikeData }: any) {
  const { isClose, handleIsClose } = useStore();
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    // Validation logic
    if (!price) {
      setError("Price is required.");
      return;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError("Please enter a valid positive price.");
      return;
    }
    try {
      const response = await axiosInstance.put(
        `admin/approvebike/${bikeData._id}`,
        {
          price,
        }
      );
      console.log("bike price put", response.data);
      toast(response?.data?.message);
      handleIsClose(); //need to check this
    } catch (error: any) {
      console.log("Error occured : ", error);
      console.log(error?.response);
      toast(error?.response.data?.message);
    }

    setError(""); // Clear error on success
    console.log("Price submitted:", price);
    // onClose(); // Close modal after submitting
  };

  const handleCancelReq = async () => {
    try {
      const response = axiosInstance.delete(
        `admin/deleterequest/${bikeData._id}`
      );
      console.log(response, "delete response");
      toast("bike request deleted");
      handleIsClose();
    } catch (err) {
      console.log("error occured", err);
      toast.error("requsest deletion failed");
    }
  };

  return (
    <div className="fixed inset-0 full h-screen justify-center items-center flex px-52 py-24 bg-transparent backdrop-blur-3xl">
      <div className="bg-[#333333] w-full h-full text-white shadow-[0_0_5px_#6A42AB,0_0_10px_#6A42AB] ">
        <div className="h-auto w-full flex justify-end pr-5">
          <p onClick={handleIsClose} className="text-4xl cursor-pointer">
            x
          </p>
        </div>
        <div className="w-full h-full px-5 flex flex-col  ">
          {/* head  */}
          <div className="">
            <p className="text-slate-400 text-4xl font-poppins font-semibold">
              {bikeData?.name}
            </p>
          </div>
          <div className="w-full flex gap-5  overflow-scroll scrollbar-none">
            <div className=" pt-10 flex gap-6 flex-col  w-1/3">
              <div className="w-full flex justify-center items-center bg-white">
                <Image
                  className="w-full object-cover rounded-lg"
                  src={bikeData?.bikeImage}
                  width={500}
                  height={200}
                  alt="load"
                />
              </div>
              <div>
                <h1 className="text-slate-400 font-base font-poppins text-xl">
                  Registration Details
                </h1>
              </div>
              <div className="w-full">
                <Image
                  className=" w-full  object-cover "
                  src={bikeData?.registrationCertificate}
                  width={300}
                  height={200}
                  alt="load"
                />
              </div>
              {/* <div>
                <h1 className="text-slate-400 font-base font-poppins text-xl" >Read it!</h1>
              <ul className="list-disc list-inside text-gray-400 space-y-2 pl-5 text-xs">
                <li>yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</li>
                <li>yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</li>
                <li>yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</li>
                <li>yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</li>
              </ul>
            </div> */}
            </div>
            <div className="   bg-green-600 ">
              <div>
                <h1>
                  Brand : <span>{bikeData?.brand}</span>
                </h1>
                <h1>
                  Engine cc : <span>{bikeData?.engine}</span>
                </h1>
                <h1>
                  Model : <span>{bikeData?.year}</span>
                </h1>
                <h1>
                  Km Driven : <span>{bikeData?.kmDriven}</span>
                </h1>
                <h1>
                  Location : <span>{bikeData?.mainLocation}</span>
                </h1>
              </div>
              <div className="flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                  <label htmlFor="price" className="mb-1">
                    Enter the price
                  </label>
                  <input
                    className="border bg-black rounded-lg px-6 py-2 appearance-none text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    placeholder="Rupees"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    // style={{
                    //   boxShadow:
                    //     "0 0 5px white, 0 0 10px white, 0 0 20px white",
                    // }}
                    className="border px-4 py-2 rounded-lg mt-4  text-white font-semibold"
                  >
                    Submit & Approve
                  </button>
                </form>
                <button onClick={handleCancelReq} className="border px-4 py-1">
                  cancel request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
