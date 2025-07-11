// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import useStore from "../../store/userStore";
// import UserNavDetailedBar from "../userNavDetailedBar/userNavDetailedBar";

// export default function Navbar() {
//   const { isOpen, handleOpenAndClose } = useStore();
//   const [navstate, setNavState] = useState(false);
//   const pathName = usePathname();
//   const router = useRouter();
//   const [scroll, setScroll] = useState<boolean>(false);
//   const [token, setToken] = useState<string | null>(null);
//   const [isClient, setIsClient] = useState(false); // Track if we're on client

//   // Set isClient to true after mounting
//   useEffect(() => {
//     setIsClient(true);
//     const tokenVar = localStorage.getItem("isUser");
//     setToken(tokenVar);
//   }, []); // Empty dependency array, runs once on mount

//   const handleSignInout = () => {
//     localStorage.clear();
//     setToken(null);
//     router.replace("/");
//   };

//   const handleScroll = () => {
//     const scrollPosition = window.scrollY;
//     const scrollBackground = scrollPosition > 800;
//     setScroll(scrollBackground);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (pathName === "/profile" || pathName?.includes("/findbike") || pathName?.includes("pro")) {
//       setScroll(true);
//     } else {
//       setScroll(false);
//     }
//   }, [pathName]);

//   if (
//     pathName === "/login" ||
//     pathName === "/register" ||
//     pathName?.includes("/admin") ||
//     pathName?.includes("/prologin") ||
//     pathName?.includes("/proregister") ||
//     pathName?.includes("/prov")
//   ) {
//     return null;
//   }

//   const handleNavState = () => {
//     setNavState(!navstate);
//   };

//   return (
//     <div className="w-full h-[60px] md:px-28 px-2 mt-5 z-50 fixed">
//       <div className="w-full h-full flex rounded-lg backdrop-blur-lg px-2">
//         <div className="flex-1 flex items-center">
//           <span
//             onClick={handleNavState}
//             className="material-symbols-outlined cursor-pointer"
//             style={{
//               fontSize: "40px",
//               color: scroll ? "black" : "white",
//               transition: "color 0.5s ease-in-out",
//             }}
//           >
//             menu
//           </span>
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <p
//             onClick={() => router.push("/")}
//             className={`cursor-pointer font-audiowide md:text-2xl lg:text-4xl ${
//               scroll ? "text-black" : "text-white"
//             } transition-colors duration-1000 ease-in-out`}
//           >
//             NEXT RIDE
//           </p>
//         </div>
//         <div className="flex-1 flex justify-end items-center">
//           <div
//             className={`md:border-2 border rounded-full md:flex flex justify-center items-center md:font-semibold text-xs px-3 py-2 flex-wrap md:text-base transition-shadow duration-300 ${
//               scroll
//                 ? "text-black hover:shadow-[0_0_5px_black,0_0_10px_black,0_0_15px_black]"
//                 : "text-white hover:shadow-[0_0_10px_white,0_0_20px_white,0_0_30px_white]"
//             } ${scroll ? "border-black" : "border-white"} transition-colors duration-1000 ease-in-out`}
//           >
//             {/* Render default button on server, update on client */}
//             {pathName === "/profile" ? (
//               <button onClick={handleSignInout}>Sign Out</button>
//             ) : isClient && token === "true" ? (
//               <button onClick={() => router.push("/profile")} className="flex items-center gap-1">
//                 <div className="w-7 h-7 rounded-full bg-white"></div>Profile
//               </button>
//             ) : (
//               <button onClick={() => router.push("/login")}>
//                 SIGN UP / SIGN IN
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="relative md:top-40 md:right-28 top-10 right-4">
//         {navstate && <UserNavDetailedBar />}
//       </div>
//     </div>
//   );
// }
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useStore from "../../store/userStore";
import UserNavDetailedBar from "../userNavDetailedBar/userNavDetailedBar";

export default function Navbar() {
  const { isOpen, handleOpenAndClose } = useStore();
  const [navstate, setNavState] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const [scroll, setScroll] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Track if we're on client

  // Set isClient to true after mounting
  useEffect(() => {
    setIsClient(true);
    const tokenVar = localStorage.getItem("isUser");
    setToken(tokenVar);
  }, []); // Empty dependency array, runs once on mount

  const handleSignInout = () => {
    localStorage.clear();
    setToken(null);
    router.replace("/");
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollBackground = scrollPosition > 800;
    setScroll(scrollBackground);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathName === "/profile" || pathName?.includes("/findbike") || pathName?.includes("pro")) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [pathName]);

  if (
    pathName === "/login" ||
    pathName === "/register" ||
    pathName?.includes("/admin") ||
    pathName?.includes("/prologin") ||
    pathName?.includes("/proregister") ||
    pathName?.includes("/prov")
  ) {
    return null;
  }

  const handleNavState = () => {
    setNavState(!navstate);
  };

  return (
    <div className="w-full h-[60px] md:px-28 px-2 mt-5 z-50 fixed">
      <div className="w-full h-full flex rounded-lg backdrop-blur-lg px-2">
        <div className="flex-1 flex items-center">
          <span
            onClick={handleNavState}
            className="material-symbols-outlined cursor-pointer"
            style={{
              fontSize: "40px",
              color: scroll ? "black" : "white",
              transition: "color 0.5s ease-in-out",
            }}
          >
            menu
          </span>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <p
            onClick={() => router.push("/")}
            className={`cursor-pointer font-audiowide md:text-2xl lg:text-4xl ${
              scroll ? "text-black" : "text-white"
            } transition-colors duration-1000 ease-in-out`}
          >
            NEXT RIDE
          </p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <div
            className={`md:border-2 border rounded-full md:flex flex justify-center items-center md:font-semibold text-xs px-3 py-2 flex-wrap md:text-base transition-shadow duration-300 ${
              scroll
                ? "text-black hover:shadow-[0_0_5px_black,0_0_10px_black,0_0_15px_black]"
                : "text-white hover:shadow-[0_0_10px_white,0_0_20px_white,0_0_30px_white]"
            } ${scroll ? "border-black" : "border-white"} transition-colors duration-1000 ease-in-out`}
          >
            {pathName === "/profile" ? (
              <button onClick={handleSignInout}>Sign Out</button>
            ) : isClient && token === "true" ? (
              <button onClick={() => router.push("/profile")} className="flex items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-white"></div>Profile
              </button>
            ) : (
              <button onClick={() => router.push("/login")}>
                SIGN UP / SIGN IN
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="relative md:top-40 md:right-28 top-10 right-4">
        {navstate && <UserNavDetailedBar />}
      </div>
    </div>
  );
}