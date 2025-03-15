"use client";

// const locations = [
//   "Kochi",
// ];

import { getMainLocations } from "@/service/fetch/fetchData";
import useStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingForm() {
  const router = useRouter();
  const {
    pickupLocation,
    pickupDate,
    dropoffDate,
    setPickupLocation,
    setPickupDate,
    setDropoffDate,
  } = useStore();
  // const [filteredLocations, setFilteredLocations] =
  //   useState<string[]>();
  // const [showDropdown, setShowDropdown] = useState(false);
 
  // useEffect(() => {
  //   const today = new Date().toISOString().split("T")[0];
  //   if (!pickupDate) setPickupDate(today);
  //   if (!dropoffDate) setDropoffDate(today);
  // }, [pickupDate, dropoffDate, setPickupDate, setDropoffDate]);

  // useEffect(() => {
  //   console.log("Pickup Location:", pickupLocation);
  //   console.log("Pickup Date:", pickupDate);
  //   console.log("Dropoff Date:", dropoffDate);
  // }, [pickupLocation, pickupDate, dropoffDate]);




  // ======================================================
  const { data, isLoading, error } = useQuery({
    queryKey: ["main-locations"],
    queryFn: getMainLocations,
  });
  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }
  if (error) {
    toast(`fetching unsuccessful.${error.message}`);
    return (
      <div className="w-full h-screen">
        <h1>{error.message}</h1>
      </div>
    );
  }
  // ============================================================


  const handleFindBikes = () => {
    if(!pickupLocation || pickupLocation == ""){
      toast.error("please select the location")
      return
    }
    router.push("/findbikes")
  }

  const locations = data?.data;

  return (
    <div className="w-full h-auto  px-5 xl:px-80 bg-transparent z-10 absolute -bottom-14">
      <div className="bg-formBg w-full h-full flex flex-wrap md:flex-nowrap items-center px-5 md:px-10 rounded-2xl shadow-xl justify-center gap-3 md:gap-5 py-5">
        <div className="flex flex-col gap-1 w-full md:w-auto ">
          <p>Pick-up Location</p>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="border xl:w-[30rem] max-w-80 md:h-14 h-12 rounded-xl shadow p-4"
          >
            <option value="" disabled>
              Select a location
            </option>
            {locations?.map((loc:any, index:any) => (
              <option key={index + 1} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p>Pick-up Date</p>
          <input
            type="date"
            value={pickupDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setPickupDate(e.target.value)}
            className="border md:w-56 w-full md:h-14 h-12 rounded-xl shadow p-4"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Drop-off Date</p>
          <input
            type="date"
            value={dropoffDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="border md:w-56 w-full md:h-14 h-12 rounded-xl shadow p-4"
          />
        </div>

        <div className="text-white">
          <button
            onClick={handleFindBikes}
            className="bg-[#0F0F0F] p-3 px-4 rounded-xl shadow"
          >
            Find a vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
