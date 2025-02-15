"use client";

import { useRouter } from "next/navigation";

export default function proRegister() {
  const router = useRouter();
  return (
    <div className="bg-black w-full h-screen p-20 px-52">
      <div
        className="w-full h-full bg-black border border-white rounded-2xl  flex overflow-hidden"
        style={{
          boxShadow: "0 0 10px white, 0 0 20px white, 0 0 30px white",
        }}
      >
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 text-white flex items-center h-full w-full py-10 flex-col justify-center gap-5">
          <h1 className="text-4xl">
            Register <span className="text-lg">as Provider</span>
          </h1>
          <form className="flex flex-col gap-3">
            {/* ========================= */}
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label className="text-sm">enter your name</label>
                <input
                  type="text"
                  placeholder="enter the name"
                  className="md:w-64 px-2 py-1 rounded-lg bg-black border border-white text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">enter your valid email</label>
                <input
                  type="email"
                  placeholder="enter the name"
                  className="md:w-64 px-2 py-1 rounded-lg bg-black border border-white text-white"
                />
              </div>
            </div>
            {/* ========================== */}
            <div className="flex flex-col">
              <label className="text-sm">enter your house address</label>
              <input
                type="text"
                className="md:w-full px-2 py-1 rounded-lg bg-black border border-white text-white"
                placeholder="same as in the ID"
              />
            </div>
            {/* ================================= */}
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  password
                </label>
                <input
                  className="w-full px-2 py-1 rounded-lg bg-black border border-white text-white"
                  type="password"
                  placeholder="enter your password"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  confirm password
                </label>
                <input
                  className="w-full px-2 py-1 rounded-lg bg-black border border-white text-white"
                  type="password"
                  placeholder="re-enter the password"
                />
              </div>
            </div>
            {/* =========================== */}
            <div>
              <label htmlFor="" className="text-sm">
                enter valid mobile
              </label>
              <input
                className="w-full px-2 py-1 rounded-lg bg-black border border-white text-white"
                type="number"
                placeholder="mobile number"
              />
            </div>
            {/* =============================== */}
            <div>
              <div>
                <label className="text-sm" htmlFor="">
                  add profile image
                </label>
                <input
                  className="w-full px-2 py-1 rounded-lg bg-black border border-white text-white"
                  type="file"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  add your Id
                </label>
                <input
                  className="w-full px-2 py-1 rounded-lg bg-black border border-white text-white"
                  type="file"
                />
              </div>
            </div>
            <button
              style={{
                boxShadow: "0 0 5px white, 0 0 10px white, 0 0 20px white",
              }}
              className="text-white border  border-white px-2 py-1 rounded-lg
              "
            >
              submit
            </button>
          </form>
          <h1>
            already have an account{" "}
            <span
              onClick={() => router.push("/auth/prologin")}
              className="text-red-600 cursor-pointer"
            >
              Login!
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
