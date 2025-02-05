"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { axiosInstance } from "@/Axios/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const userRegister = async (values: any) => {
  const response = await axiosInstance.post("user/register", {
    name: values.username,
    email: values.email,
    mobile: values.mobileNumber,
    password: values.password,
  });
  console.log("register response check", response.data);
  return response.data;
};

export default function Register() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger the opacity transition after the component mounts
    setIsLoaded(true);
  }, []);

  const mutation = useMutation({
    mutationFn: (values: {
      name: string;
      email: string;
      mobile: string;
      password: string;
    }) => userRegister(values),
  });

  interface registerValues {
    username: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword:string;
  }

  const formik = useFormik<registerValues>({
    initialValues: {
      username: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
        .required("Mobile number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values:any, { resetForm }) => {
      try {

        const respoonse = await mutation.mutate(values)
        console.log("check" , respoonse)
        toast.success("Registration successful!");
        alert("Registration successful!")
        resetForm(); // Clear form after success
        router.push("/login"); // Redirect to login page
      } catch (error) {
        toast.error("Registration failed!");
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="bg-[url('https://img.freepik.com/free-photo/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background_1048-11333.jpg?t=st=1738258764~exp=1738262364~hmac=f779a38b63244bf3b0b412527e94872bdefc9a3a0685197c8cc4cf21774d2bbe&w=1380')] bg-no-repeat bg-cover w-full h-screen flex justify-center items-center">
      <motion.div
        className={`h-[850px] w-[1300px] bg-black rounded-3xl shadow-[4px_4px_10px_rgba(0,0,0,0.6)] flex flex-row-reverse overflow-hidden `}
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ duration: 1 }} // Smooth fade-in transition for 1 second
      >
        {/* Image div */}
        <div className="bg-auth flex-1 flex justify-center items-center">
          <img src="/images/bike.png" alt="" />
        </div>

        {/* Form div */}
        <div className="bg-white flex-1 flex justify-center items-center flex-col gap-4">
          <h1 className="text-black text-4xl font-bold">Sign Up</h1>
          <div className="w-[25rem] border border-input rounded-xl flex justify-center items-center shadow-[0_4px_6px_-1px_rgba(182,141,118,0.5),0_2px_4px_-1px_rgba(182,141,118,0.3)]">
            <form
              onSubmit={formik.handleSubmit}
              className="flex justify-center items-center flex-col gap-4 p-6 bg-white rounded-xl shadow-md w-full max-w-md h-full"
            >
              {/* Username Input */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}

              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}

              {/* Mobile Number Input */}
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.mobileNumber}
                </p>
              )}

              {/* Password Input */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}

              {/* Confirm Password Input */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}

              {/* Forgot Password Link */}
              <p className="text-sm text-blue-600 hover:underline cursor-pointer self-end">
                Forgot password?
              </p>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-input text-white py-2 px-4 rounded-full hover:bg-inputhover transition-colors duration-200"
              >
                Sign Up
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white border border-input text-gray-700 py-2 px-4 rounded-full hover:inputhover transition-colors duration-200"
              >
                <img
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              {/* Already Have an Account Link */}
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Log in
                </span>
              </p>
            </form>
          </div>
        </div>
        {/* ============================================= */}
      </motion.div>
    </div>
  );
}
