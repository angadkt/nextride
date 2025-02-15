"use client";

import { useState } from "react";
import Image from "next/image";
import dashboardIcon from "../../../../public/adminIcons/dashboardIcon.png";
import UserIcon from "../../../../public/adminIcons/user.png";
import BikesIcon from "../../../../public/adminIcons/bikesicon.png";
import Providersicon from "../../../../public/adminIcons/providers.png";
import Widget from "../../../../public/adminIcons/widget.png";
// import MainLogo from "../../../../public/adminIcons/mainLogo.png";
import AdminProfile from "../../../../public/adminIcons/adminprofile.png";
import Logout from "../../../../public/adminIcons/logout.png";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAdminLogout } from "@/service/fetch/fetchData";
import Swal from "sweetalert2";

export default function SideBar() {
  const queryClient = useQueryClient();
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(false);

  // ====================================

  const mutation = useMutation({
    mutationFn: handleAdminLogout,
    onSuccess: () => {
      router.replace("/login");
      //   alert("admin signned out");
    },
    onError: (error) => {
      console.log("Error :", error);
      alert("admin signOut failed");
    },
  });

  //=========================================

  const handleRouteOnClick = (route: string) => {
    router.push(`/adminhome/${route}`);
  };

  console.log("pathname", pathName);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      setDisplay((prev) => !prev);
    }, 150);
  };

  const adminLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      //   text: "Do you want to Sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A42AB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
      customClass: {
        popup: "bg-[#333333] rounded-xl shadow-2xl w-80 h-80",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        queryClient.clear();
        mutation.mutate();
        Swal.fire({
          title: "Admin Signned Out!",
          //   text: "Your file has been deleted.",
          icon: "success",
          customClass: {
            popup: "bg-[#333333] rounded-xl shadow-2xl w-96 h-96",
          },
        });
      }
    });
  };

  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-20"
      }   h-screen bg-[#1C1C1C] flex flex-col justify-between py-5 px-4   gap-3 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col gap-3">
        <div className="text-white flex gap-3 items-center">
          <Image
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            onClick={handleClick}
            src={Widget}
            width={40}
            height={40}
            alt="loading"
          />
          {isOpen && display ? (
            <h1 className="text-xl font-semibold font-audiowide text-white flex gap-2">
              NEXT RIDE{" "}
              {/* <Image src={MainLogo} width={40} height={40} alt="load" /> */}
            </h1>
          ) : null}
        </div>
        <div className="mt-10  flex gap-5 p-2 relative">
          <Image src={dashboardIcon} width={25} height={25} alt="loading" />

          {/* <div className="ml-5"> */}
          {isOpen && display ? (
            <h1 className="text-base font-medium text-white">Dashboard</h1>
          ) : null}
          {/* </div> */}
        </div>
        <div
          className={`p-2 flex gap-5 cursor-pointer rounded-xl ${
            pathName === "/adminhome/adminusers" ? "bg-[#6A42AB]" : null
          }`}
          onClick={() => handleRouteOnClick("adminusers")}
        >
          <Image src={UserIcon} width={25} height={25} alt="loading" />
          {isOpen && display ? (
            <h1 className="text-base font-medium text-white">Users</h1>
          ) : null}
        </div>
        <div onClick={()=>handleRouteOnClick('temp')} className=" p-2 flex gap-5">
          <Image src={BikesIcon} width={25} height={25} alt="loading" />
          {isOpen && display ? (
            <h1 className="text-base font-medium text-white">Bikes</h1>
          ) : null}
        </div>
        <div className=" p-2 flex gap-5">
          <Image src={Providersicon} width={25} height={25} alt="loading" />
          {isOpen && display ? (
            <h1 className="text-base font-medium text-white">Providers</h1>
          ) : null}
        </div>
      </div>
      <div>
        <div
          onClick={adminLogout}
          className="flex gap-2 items-center hover:bg-[#6A42AB] rounded-lg "
        >
          <Image src={AdminProfile} width={50} height={20} alt="load" />
          {isOpen && display && (
            <div>
              <h1 className="text-lg font-semibold text-white">Admin</h1>
              <div className="flex gap-1">
                <button className="text-white ">Sign Out</button>
                <Image src={Logout} width={20} height={15} alt="load" />
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
