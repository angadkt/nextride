"use client";
import { getSpecificUsers } from "@/service/fetch/fetchData";
import { useQuery } from "@tanstack/react-query";

export default function users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getSpecificUsers,
  });
  console.log("data", data?.data);
  if (isLoading) return <p className="text-white">Loading</p>;
  if (error) return <p>Error:{error.message}</p>;

  return (
    <div className="w-full h-screen  flex items-center justify-center px-[112px] py-[50px] pt-[100px] gap-5 ">
      <div
        className="flex-1 bg-white border h-full w-full rounded-xl shadow-2xl flex
      flex-col p-10 items-start gap-4 overflow-y-auto scrollClass scrollbar-none scroll-smooth"
      >
        <div className="flex justify-start items-center gap-4  w-full">
          <div className="w-40 h-40 rounded-xl bg-orange-500"></div>
          <div className=" flex flex-col">
            <div>
              <h1 className="text-4xl">
                {data?.data?.name}
              </h1>
            </div>
            <div>
              <h1>
                {data?.data?.email}
              </h1>
            </div>
            <div>
              <h1>
               {data?.data?.mobile}
              </h1>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        <hr className="border-t-2 border-slate-500 w-full my-5 " />
        {/* ================================================================ */}
        <div className="flex flex-col gap-3 ">
          <div>
            <h1 className="text-xl font-semibold">Password settings</h1>
          </div>
          <div>
            <div>
              <button className="px-2 py-2 border">Change Password</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold">
            <h1>Document Verification</h1>
          </div>
          <div>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Please upload the following documents:
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Driving License/International Driving Permit</li>
                  <li>Identification Proof</li>
                </ol>
              </li>
              <li>
                Accepted forms of ID that can be uploaded are: Aadhaar Card,
                Passport. For international users, a passport along with a valid
                visa.
              </li>
              <li>For bulk bookings, contact our support team.</li>
              <li>Ensure to upload pictures of original documents only.</li>
              <li>
                Learner license is not applicable for renting a vehicle with us.
              </li>
            </ul>
          </div>
        </div>
        {/* ================================= */}
        <hr className="border-t-2 border-slate-500 w-full my-5 " />
        {/* ================================= */}
        <div>
          <div>
            <h1 className="text-lg font-semibold">Upload DL</h1>
            <ul className="list-disc">
              <li>
                Please upload both sides of your original driving license or
                international driving permit.
              </li>
              <li>
                Ensure that the images uploaded clearly show your details to
                ensure faster verification
              </li>
            </ul>
          </div>
          <div className="flex gap-8 p-6 bg-white rounded-2xl w-full justify-center items-center">
            {/* Front Side */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-700">Front</h1>
              <label className="flex flex-col items-center justify-center w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300">
                <span className="text-sm text-gray-500">Upload</span>
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* Back Side */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-700">Back</h1>
              <label className="flex flex-col items-center justify-center w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300">
                <span className="text-sm text-gray-500">Upload</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        {/* =============================== */}
        <hr className="border-t-2 border-slate-500 w-full my-5 " />
        {/* =============================== */}
        <div>
          <div>
            <h1 className="text-lg font-semibold">Upload ID</h1>
            <ul className="list-disc">
              <li>Please upload both sides of your original identification proof (Aadhaar Card or Passport).</li>
              <li>Ensure that the images uploaded clearly show your details to ensure faster verification.</li>
            </ul>
          </div>
          <div className="flex gap-8 p-6 bg-white rounded-2xl w-full justify-center items-center">
            {/* Front Side */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-700">Front</h1>
              <label className="flex flex-col items-center justify-center w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300">
                <span className="text-sm text-gray-500">Upload</span>
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* Back Side */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-700">Back</h1>
              <label className="flex flex-col items-center justify-center w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300">
                <span className="text-sm text-gray-500">Upload</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-yellow-500 h-full w-full rounded-xl shadow-xl"></div>
      <div className="flex-1 bg-blue-500 h-full w-full rounded-xl shadow-xl"></div>
    </div>
  );
}
