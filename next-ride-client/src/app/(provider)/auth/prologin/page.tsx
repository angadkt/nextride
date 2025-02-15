"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/Axios/axiosInstance";
import toast from "react-hot-toast";



export default function proLogin() {
  const router = useRouter();


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await axiosInstance.post("/provider/login", {
        email: values.email,
        password: values.password,
      });
      console.log("response", response.data);
      if (response.status === 200) {
        toast("provider loginned successfully");
        router.replace("/providerdash")
      }
      return response.data;
    } catch (err: any) {
      console.log("error occured", err);
      toast(err.response.data.message);
    }
  };

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
            Login <span className="text-lg">as Provider</span>
          </h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="w-full flex flex-col items-center gap-5">
                <Field
                  type="email"
                  name="email"
                  className="bg-black border border-white p-2 md:w-96 rounded-lg"
                  placeholder="enter the email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="password"
                  name="password"
                  className="bg-black border border-white p-2 md:w-96 rounded-lg"
                  placeholder="enter the password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  style={{
                    boxShadow: "0 0 5px white, 0 0 10px white, 0 0 20px white",
                  }}
                  className="text-white border border-white px-2 py-1 rounded-lg"
                >
                  submit
                </button>
              </Form>
            )}
          </Formik>
          <h1>
            create new account?{" "}
            <span
              onClick={() => router.push("/auth/proregister")}
              className="text-red-600 cursor-pointer"
            >
              register!
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
