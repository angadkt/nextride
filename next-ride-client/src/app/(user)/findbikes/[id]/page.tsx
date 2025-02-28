"use client";
import { axiosInstance } from "@/Axios/axiosInstance";
import Loader from "@/components/loader/loader";
import { getNumberOfDays, getSelectedBikes } from "@/service/fetch/fetchData";
import useStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingPage() {
  const { pickupLocation, pickupDate, dropoffDate, pickUpTime, dropOfTime } =
    useStore();
  const numberOfDays = getNumberOfDays(pickupDate, dropoffDate);
  console.log(numberOfDays);

  //   if(Number.isNaN(numberOfDays)){
  //     return (
  //         <div className="w-screen h-screen justify-center items-center">
  //             <Loader />
  //             {toast("go back and select the dates")}
  //         </div>
  //     )
  //   }
  const params = useParams();
  const bikeId = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-bikes", bikeId],
    queryFn: ({ queryKey }) => getSelectedBikes(queryKey[1]),
    enabled: !!bikeId,
  }); //passing a value as argument to the query function
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  const tax = data?.data.price * (18 / 100);
  const totalCoast = Number(Math.abs(data?.data.price * numberOfDays + tax + 500));

  const handleBooking = async () => {
    console.log("total cost ",totalCoast)
    try {
      const response = await axiosInstance.post("/user/bookmybike", {
        bikeId,
        mainLocation: pickupLocation,
        pickUpDate:pickupDate,
        dropOffDate:dropoffDate,
        pickUpTime,
        dropOffTime:dropOfTime,
        totalCost:totalCoast,
      });
      console.log(response, "response");
    } catch (err: any) {
      console.log("error occured", err);
      toast(err.response.data.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black/10 text-white p-6 md:p-24 font-poppins">
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 ">
        {/* Left Section */}
        <div className="w-full md:w-[75%] bg-white rounded-xl shadow-xl p-6 flex flex-col gap-6 text-black">
          {/* Summary Header */}
          <div className="border-b border-black pb-4">
            <h1 className="text-2xl font-medium font-poppins">SUMMARY</h1>
          </div>

          {/* Bike Details and Dates */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Image and Bike Info */}
            <div className="flex flex-col items-center md:items-start w-full md:w-[45%] gap-3">
              <Image
                src={data?.data.bikeImage}
                width={500}
                height={400}
                alt="Bike"
                className="rounded-xl shadow-md"
              />
              <h1 className="text-3xl font-semibold text-gray-800">
                {data?.data.brand} {data?.data.name}
              </h1>
              <h2 className="text-xl text-gray-600">{data?.data.year}</h2>
            </div>

            {/* Pricing and Dates Info */}
            <div className="w-full md:w-[55%] flex flex-col gap-2">
              {/* Date Range */}
              <div className="flex justify-between text-lg text-gray-800 font-medium">
                <div className="flex flex-col">
                  <h1>{pickupDate} </h1>
                  <h1>{pickUpTime}</h1>
                </div>
                <h1> to </h1>
                <div className="flex flex-col">
                  <h1> {dropoffDate}</h1>
                  <h1> {dropOfTime}</h1>
                </div>
              </div>
              <hr />
              {/* Pricing */}
              <div className="flex justify-between text-lg font-medium text-gray-800">
                <h1>Per day price *₹{data?.data.price}</h1>
                <h1>-</h1>
                <h1>₹{data?.data.price * numberOfDays}</h1>
              </div>
              <hr />
              {/* Total Price */}
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <h1>Total</h1>
                <h1>₹{data?.data.price * numberOfDays}</h1>
              </div>
              <hr />
              {/* KM Limit & Excess Charges */}
              <div className="flex justify-between text-lg text-gray-800 text-sm">
                <div>
                  <h1>KM limit</h1>
                  <h1>Excess km charges</h1>
                </div>
                <div>
                  <h1>120 km</h1>
                  <h1>₹10/km</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full min-h-0 md:w-[25%] bg-white rounded-xl shadow-xl p-6 flex flex-col gap-6 justify-between ">
          <div>
            <h2 className="text-2xl font-medium text-gray-800">
              Billing Details
            </h2>
            <div className="w-full text-black flex justify-between">
              <div className="flex flex-col gap-1">
                <h1>Vehicle rental charges</h1>
                <h1>Taxes</h1>
                <h1>Refundable deposite</h1>
                <h1>subtotal</h1>
                <hr />
                <h1 className="text-xl font-medium">Total</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1>{data?.data.price * numberOfDays}</h1>
                <h1>{tax}</h1>
                <h1>500</h1>
                <h1>{totalCoast}</h1>
                <h1 className="text-xl font-medium">{totalCoast}</h1>
              </div>
            </div>
          </div>
          <button
            onClick={handleBooking}
            className="text-black border py-3 bg-yellow-300 hover:bg-yellow-500 text-xl"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}
