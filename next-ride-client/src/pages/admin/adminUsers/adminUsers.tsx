"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SideBar from "../adminSideBar/sideBar";
import {
  getAlluserData,
  handleBlockAndUnblock,
  handleDeleteUser,
} from "@/service/fetch/fetchData";
import Loader from "@/components/loader/loader";
import Swal from "sweetalert2";


export default function AdminUsers() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userId: any) => handleBlockAndUnblock(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userdata"] });
    },
    onError: (error) => {
      console.error("Error during block/unblock: ", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: any) => handleDeleteUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["userdata"] });
      console.log("data check", data);
    },
    onError: (error) => {
      console.error("Error during delete :", error);
    },
  });

  // =================== getting the user data =================
  const { data, isLoading, error } = useQuery({
    queryKey: ["userdata"],
    queryFn: getAlluserData,
  });
  console.log("data", data?.data);
  if (isLoading)
    return (
      <div className="bg-[#333333] h-screen flex justify-center items-center w-full">
        <div className="w-20 h-20">
          <Loader />
        </div>
      </div>
    );
  if (error)
    return <div className="bg-[#333333] h-screen w-full">Error:{error.message}</div>;
  // =====================================================================

  const handleUpdateUser = (userId: any) => {
    mutation.mutate(userId);
  };

  const handleDeleteUserMutation = (userId: any) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "Do you want to delete user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A42AB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete User!",
      customClass: {
        popup: "bg-[#333333] rounded-xl shadow-2xl w-80 h-80", 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(userId)
        Swal.fire({
          title: "User Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          customClass: {
            popup: "bg-[#333333] rounded-xl shadow-2xl w-96 h-96", 
          },
        });
      }
    })
  };

  return (
    <div className="bg-[#333333] flex w-full h-screen">
      {/* <SideBar /> */}
      <div className="flex-grow ">
        <div className="ml-5 mt-4">
          <h1 className="text-3xl font-semibold text-white">Users</h1>
        </div>
        <div className="ml-5 mt-4 overflow-x-auto md:px-28 ">
          <table className="table-auto w-full   border-collapse border border-gray-700 shadow-2xl ">
            <thead>
              <tr className="bg-gray-800 text-white text-left ">
                <th className="border border-gray-700 px-4 py-2">No</th>
                <th className="border border-gray-700 px-4 py-2">Name</th>
                <th className="border border-gray-700 px-4 py-2">Mobile</th>
                <th className="border border-gray-700 px-4 py-2">
                  Advance Settings
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item: any, index: number) => (
                <tr
                  key={item._id}
                  className="text-white hover:bg-gray-700 text-lg"
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {index + 1}
                  </td>
                  <td  className="border border-gray-700 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {item.mobile}
                  </td>
                  <td className="flex flex-col justify-center items-center gap-3 border border-gray-700 px-4 py-2">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateUser(item._id)}
                        className={`w-20 ${
                          item.isBlocked
                            ? "bg-green-500 hover:bg-green-700 "
                            : "bg-orange-400 hover:bg-orange-600"
                        }  py-1 px-2 rounded-md`}
                      >
                        {item.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDeleteUserMutation(item._id)}
                        className=" w-20 bg-red-500 hover:bg-red-700 rounded-md"
                      >
                        Delete{" "}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
