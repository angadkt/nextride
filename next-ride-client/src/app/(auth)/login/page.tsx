"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { axiosInstance } from "@/Axios/axiosInstance";
import { AxiosError } from "axios";
// import { signIn } from "next-auth/react";
import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";

const userSignIn = async (values: any) => {
  try {
    const response = await axiosInstance.post("user/login", {
      email: values.email,
      password: values.password,
    });
    console.log("response check", response);
    if (response.status === 200) {
      toast("user logginned successfully");
    } else if (response.status === 202) {
      toast("admin loggined successfully");
    }
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // TypeScript now knows the shape of `error.response`
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log("Error message:", errorMessage);
      console.log("error", error)
      toast.error(errorMessage);
    } else {
      // Handle non-Axios errors
      console.error("Unknown error:", error);
      toast.error("An unexpected error occurred.");
    }
  }
};

export default function SignIn() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      userSignIn(values),
    onSuccess: (data) => {
      if (data.role === "admin") {
        router.replace("/adminhome");
      } else {
        router.replace("/");
        localStorage.setItem("isUser", "true");
      }
      console.log("data", data);
    },
  });

  interface signInValues {
    email: string;
    password: string;
  }

  const formik = useFormik<signInValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log("Google Login Success:", credentialResponse.credential);
    if (!credentialResponse.credential) {
      console.error("Google credential is missing");
      toast.error("Google Login Failed");
      return;
    }
    try {
      const res = await axiosInstance.post("/user/auth/google-login", {
        token: credentialResponse.credential,
      });
      console.log("res", res);
      localStorage.setItem("isUser", "true");
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err) {
      console.error("Google login failed", err);
      toast.error("Google login failed.");
    }
  };


  return (
    <div className="bg-[url('https://img.freepik.com/free-photo/dark-texture-surface_24837-340.jpg?t=st=1739963471~exp=1739967071~hmac=b093fde2fd05cc04062bb696ec27a5087d0d57572b33c79dcc2cf29fe7893776&w=1380')] bg-no-repeat bg-cover w-full h-screen flex justify-center items-center">
      <motion.div
        className="h-[850px] w-[1300px] bg-black rounded-3xl shadow-[4px_4px_10px_rgba(0,0,0,0.6)] flex overflow-hidden"
        initial={{ opacity: 0 }} // Start hidden
        animate={{ opacity: 1 }} // Fade in when route is loaded
        transition={{ duration: 1 }} // Smooth transition in 1 second
      >
        {/* Image div */}

        <div className="bg-auth flex-1 rounded-l-3xl flex justify-center items-center">
          <img src="/images/bike.png" alt="" />
        </div>

        {/* Form div */}
        <div className="bg-white flex-1 rounded-r-3xl flex justify-center items-center flex-col gap-4">
          <h1 className="text-black text-4xl font-bold">Sign In</h1>
          <div className="w-96 h-96 border border-input rounded-xl flex justify-center items-center shadow-[0_4px_6px_-1px_rgba(182,141,118,0.5),0_2px_4px_-1px_rgba(182,141,118,0.3)]">
            <form
              className="flex justify-center items-center flex-col gap-4 p-6 bg-white rounded-xl shadow-md w-full max-w-md h-full"
              onSubmit={formik.handleSubmit}
            >
              {/* Email Input */}
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs w-full h-full">
                  {formik.errors.email}
                </div>
              )}

              {/* Password Input */}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-inputhover text-black"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs w-full h-full ">
                  {formik.errors.password}
                </div>
              )}

              {/* Forgot Password Link */}
              <p className="text-sm text-blue-600 hover:underline cursor-pointer self-end">
                Forgot password?
              </p>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-input text-white py-2 px-4 rounded-full hover:bg-inputhover transition-colors duration-200"
              >
                Sign in
              </button>

              {/* Google Login Button */}
              {/* <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white border border-input text-gray-700 py-2 px-4 rounded-full hover:inputhover transition-colors duration-200"
                onClick={googleLogin}
              >
                <img
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button> */}
              <div >
                <GoogleLogin
                  // className="google-login-button"
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.error("Google Login Failed");
                    toast.error("Google login failed");
                  }}
                />
              </div>

              {/* Sign Up Link */}
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => router.push("/register")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
