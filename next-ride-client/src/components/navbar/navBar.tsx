"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import  useStore  from "../../store/userStore";

export default function Navbar() {
  const { isOpen , handleOpenAndClose } = useStore()
  const pathName = usePathname()
  const router = useRouter();

  const [scroll, setScroll] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null)



  useEffect(() => {
   if(typeof window !== "undefined"){
    const tokenVar: string | null = localStorage.getItem("isUser");
    console.log("token from local storage",tokenVar)
    console.log("token from local storage",typeof tokenVar)

    setToken(tokenVar);
   }
  }, [token]);

  const handleSignInout = () => {
    localStorage.clear();
    setToken(null);
    router.replace('/')
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
    if (pathName === "/profile") {
      setScroll(true); 
    }else {
      setScroll(false);
    }
  }, [pathName]);
  
  
  if (pathName === "/login" || pathName === "/register" || pathName?.includes("/admin") || pathName?.includes("/provider")){
    return null;
  }
  
  // const tokenvar:string | null = localStorage.getItem("token")


    console.log("isOpen", isOpen)
  return (
    <div className="w-full h-[60px] md:px-28 px-2 mt-5 z-50 fixed">
      <div className="w-full h-full flex  rounded-lg backdrop-blur-lg px-2">
        <div className="flex-1  flex items-center ">
          <span
          onClick={handleOpenAndClose}
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
        <div className="flex-1  flex justify-center items-center">
          <p
            className={`font-audiowide md:text-2xl lg:text-4xl ${
              scroll ? "text-black" : "text-white"
            } transition-colors duration-1000 ease-in-out`}
          >
            NEXT RIDE
          </p>
        </div>
        <div className="flex-1  flex justify-end items-center ">
          <div
            className={`md:border-2 border   rounded-full md:flex  flex  justify-center items-center md:font-semibold  text-xs px-3 py-2 flex-wrap md:text-base  ${
              scroll ? "text-black" : "text-white"
            } ${
              scroll ? "border-black" : "border-white"
            } transition-colors duration-1000 ease-in-out`}
          >
            {pathName === "/profile"? (
              <button onClick={handleSignInout}>Sign Out</button>
            ) : token === "true" ? (
              <button onClick={()=>router.push('/profile')} className="flex items-center gap-1"><div className="w-7 h-7 rounded-full bg-white"></div>Profile</button>
            ) : (<button onClick={() => router.push("/login")}>
            SIGN UP / SIGN IN
          </button>)}
          </div>
        </div>
      </div>
    </div>
  );
}
