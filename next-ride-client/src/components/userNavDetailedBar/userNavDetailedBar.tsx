"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const arr = [
  {
    name: "Earn with us",
    path: "/auth/prologin",
  },
  {
    name: "Profile",
    path: "/",
  },
  {
    name: "My bookings",
    path: "/bookings",
  },
  {
    name: "load2",
    path: "/",
  },
  {
    name: "load3",
    path: "/",
  },
  {
    name: "load4",
    path: "/",
  },
  {
    name: "load5",
    path: "/",
  },
];



export default function UserNavDetailedBar() {
const [bgColor , setBgColor] = useState<string>("")
const router = useRouter()


useEffect(() => {
  console.log("UserNavDetailedBar Mounted");

  return () => {
    console.log("UserNavDetailedBar Unmounted");
  };
}, []);

  const handleNav = (clrStr : string , path:string) =>{
    setBgColor(clrStr)
    router.push(path)
  } 
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen w-full "
        
        key="user-navhead"
      >
        <motion.div className="w-48 bg-zinc-700  px-5 py-10 flex flex-col gap-5 rounded-tr-3xl"
        key="user-nav"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {arr.map((item: any, index: number) => (
            <motion.div
              className={ `cursor-pointer border flex flex-col  gap-5 px-2 py-1 rounded-tr-3xl ${bgColor === item.name ? "bg-white text-black" : "text-white"}`}
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={()=>handleNav(item.name, item.path)}
            >
              <p className=" font-robotoMono">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
