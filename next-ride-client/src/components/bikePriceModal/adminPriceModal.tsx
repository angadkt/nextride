"use client";
import { axiosInstance } from "@/Axios/axiosInstance";
import useStore from "@/store/userStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PriceModal({bikeId} : any) {
    const { isClose, handleIsClose } = useStore()
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

        const response = await axiosInstance.put(`admin/approvebike/${bikeId}`,{
            price
        })
        console.log("bike price put",response.data)
        toast(response?.data?.message)
        handleIsClose() //need to check this
    } catch (error : any) {
        console.log("Error occured : ", error)
        console.log(error?.response)
        toast(error?.response.data?.message)
    }

    setError(""); // Clear error on success
    console.log("Price submitted:", price);
    // onClose(); // Close modal after submitting
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent   ">
      <div
        style={{
          boxShadow: "0 0 5px white, 0 0 10px white, 0 0 20px white",
        }}
        className="w-96 h-72 bg-black shadow-4xl rounded-3xl flex justify-center items-center flex-col text-gray-200 gap-4 relative p-6"
      >
        {/* Close Button */}
        <button
          onClick={handleIsClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✖
        </button>

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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            style={{
                boxShadow: "0 0 5px white, 0 0 10px white, 0 0 20px white",
              }}
            className="border px-4 py-2 rounded-lg mt-4  text-white font-semibold"
          >
            Submit & Approve
          </button>
        </form>
      </div>
    </div>
  );
}
