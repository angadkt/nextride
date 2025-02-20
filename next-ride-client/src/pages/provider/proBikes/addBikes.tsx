"use client";

import { axiosInstance } from "@/Axios/axiosInstance";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface BikeFormValues {
  brand: string;
  name: string;
  engineCc: string;
  kmDriven: string;
  mileage: string;
  dlNumber: string;
  mainLocation: string;
  year: string;
  pickupLocations: string[]; // Array of strings
  bikeImage: File | null;
  rcImage: File | null;
}

const arr = ["navya", "ajmal", "hashim"];

export default function AddBikeForm() {
  // const [formValues, setFormValues] = useState({
  //   brand: "",
  //   name: "",
  //   engineCc: "",
  //   kmDriven: "",
  //   mileage: "",
  //   dlNumber: "",
  //   mainLocation: "",
  //   pickupLocations: [""], // Initialize with one empty string
  //   bikeImage: null,
  //   rcImage: null,
  //   year: "",
  // });
  // Initial form values
  const initialValues: BikeFormValues = {
    brand: "",
    name: "",
    engineCc: "",
    kmDriven: "",
    mileage: "",
    dlNumber: "",
    mainLocation: "",
    pickupLocations: [""], // Initialize with one empty string
    bikeImage: null,
    rcImage: null,
    year: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    brand: Yup.string().required("Brand is required"),
    name: Yup.string().required("Name is required"),
    engineCc: Yup.string()
      .matches(/^\d+$/, "Engine CC must be a number")
      .required("Engine CC is required"),
    kmDriven: Yup.string()
      .matches(/^\d+$/, "KM Driven must be a number")
      .required("KM Driven is required"),
    mileage: Yup.string()
      .matches(/^\d+$/, "Mileage must be a number")
      .required("Mileage is required"),
    dlNumber: Yup.string().required("DL Number is required"),
    mainLocation: Yup.string().required("Main Location is required"),
    year: Yup.string().required("Year is required"),
    pickupLocations: Yup.array()
      .of(Yup.string().required("Pickup location cannot be empty"))
      .min(1, "At least one pickup location is required"),
    bikeImage: Yup.mixed<File>()
      .required("Bike Image is required")
      .test("fileSize", "File too large", (value) => {
        return value && value.size <= 2000000; // Max 2MB
      }),
    rcImage: Yup.mixed<File>()
      .required("RC Image is required")
      .test("fileSize", "File too large", (value) => {
        return value && value.size <= 5000000; // Max 2MB
      }),
  });

  // Handle form submission
  const handleSubmit = async (values: BikeFormValues, { resetForm }: any) => {
    console.log("values");
    try {
      const formData = new FormData();
      formData.append("brand", values.brand);
      formData.append("name", values.name);
      formData.append("engine", values.engineCc);
      formData.append("kmDriven", values.kmDriven);
      formData.append("mileage", values.mileage);
      formData.append("DlNumber", values.dlNumber);
      formData.append("mainLocation", values.mainLocation);
      formData.append("year", values.year.toString());
      formData.append("bikeImage", values.bikeImage as File);
      formData.append("registrationCertificate", values.rcImage as File);

      // Add pickup locations as an array
      values.pickupLocations.forEach((location, index) => {
        formData.append(`pickUpLocations[${index}]`, location);
      });

      // console.log("hello  ")
      // console.log("formData", formData)

      const response = await axiosInstance.post(
        "/provider/addbikes",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Bike added successfully", response.data);
      toast("bike added to the admins panel");
      resetForm();
    } catch (err) {
      console.log("error occured adding bike", err);
    }
  };

  // console.log("value", formValues.brand);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-row gap-5 border p-10 shadow-2xl rounded-sm">
          {/* Row 1 */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex gap-5">
              <div>
                <Field
                  className="w-80 border p-2"
                  name="brand"
                  placeholder="brand"
                  // value={formValues.brand}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     brand: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  className="w-80 border p-2"
                  name="name"
                  placeholder="name"
                  // value={formValues.name}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     name: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-5 ">
              <div>
                <Field
                  className="w-80 border p-2"
                  name="engineCc"
                  placeholder="engine cc"
                  // value={formValues.engineCc}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     engineCc: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="engineCc"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  className="w-80 border p-2"
                  name="kmDriven"
                  placeholder="km driven"
                  // value={formValues.kmDriven}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     kmDriven: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="kmDriven"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-5">
              <div>
                <Field
                  className="w-80 border p-2"
                  name="mileage"
                  placeholder="mileage"
                  // value={formValues.mileage}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     mileage: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="mileage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  className="w-80 border p-2"
                  name="dlNumber"
                  placeholder="DL number"
                  // value={formValues.dlNumber}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     dlNumber: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="dlNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Row 4 - Main Location and Pickup Locations */}
            <div className="flex gap-5">
              <div>
                <Field
                  className="w-80 border p-2"
                  name="mainLocation"
                  placeholder="Main location"
                  // value={formValues.mainLocation}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     mainLocation: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="mainLocation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  className="w-80 border p-2"
                  name="year"
                  placeholder="registered year"
                  // value={formValues.year}
                  // onChange={(e: any) =>
                  //   setFormValues((prev) => ({
                  //     ...prev,
                  //     year: e.target.value,
                  //   }))
                  // }
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Dynamic Pickup Locations */}
            <FieldArray name="pickupLocations">
              {({ remove, push }) => (
                <div className="flex flex-col gap-3">
                  <label>Pickup Locations</label>
                  {values.pickupLocations.map((location, index) => (
                    <div key={index} className="flex gap-2">
                      <Field
                        className="w-80 border p-2"
                        name={`pickupLocations[${index}]`}
                        placeholder="Pickup location"
                        // value={location}
                        // onChange={(e: any) => {
                        //   const newLocatoins = [...values.pickupLocations];
                        //   newLocatoins[index] = e.target.value;
                        //   setFormValues((prev) => ({
                        //     ...prev,
                        //     pickupLocations: newLocatoins,
                        //   }));
                        // }}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="border px-2 py-1 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="border px-2 py-1 text-green-500"
                  >
                    Add Location
                  </button>
                </div>
              )}
            </FieldArray>
            <ErrorMessage
              name="pickupLocations"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* File Inputs */}
            <div className="flex flex-col gap-3">
              <label>Add Bike Image</label>
              <input
                type="file"
                onChange={(event) =>
                  setFieldValue("bikeImage", event.currentTarget.files?.[0])
                }
              />
              <ErrorMessage
                name="bikeImage"
                component="div"
                className="text-red-500 text-sm"
              />

              <label>Add RC</label>
              <input
                type="file"
                onChange={(event) =>
                  setFieldValue("rcImage", event.currentTarget.files?.[0])
                }
              />
              <ErrorMessage
                name="rcImage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button className="border px-2 py-1" type="submit">
                submit
              </button>
            </div>
          </div>
          <div className="bg-[#c4c4c4] md:flex-1  hidden md:flex justify-center items-center rounded-md shadow-inner">
            {/* preview card */}
            <div className="w-auto h-auto border p-4 shadow-xl rounded-xl bg-white flex flex-col gap-1">
              
              {values.bikeImage ? (
                <img
                  src={URL.createObjectURL(values.bikeImage)}
                  alt="Bike Preview"
                  className="w-72 h-48"
                />
              ) : (
                <img
                  src="https://www.royalenfield.com/content/dam/royal-enfield/philippines/motorcycles/himalayan/colors/new-colors/studio-shots/pine-green/rear-view.png"
                  alt="Default Preview"
                  className="w-72 h-52"
                />
              )}
              <h1 className="font-semibold text-xl text-gray-600">
                {values.name || "Bike Name"}
              </h1>
              <h1 className="font-semibold text-lg text-gray-600">
                {values.year || "Year"}
              </h1>
              <h1 className="font-semibold text-sm text-gray-400">
                {values.brand || "Brand"}
              </h1>
              <h1 className="font-semibold text-sm text-gray-400">
                KM reached - {values.kmDriven || "0"}
              </h1>
              <h1 className="font-semibold text-sm text-gray-400">
                {values.dlNumber || "DL Number"}
              </h1>
              <h1 className="font-semibold text-sm text-gray-400">
                {values.mainLocation || "Main Location"}
              </h1>
              <select className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ">
                <option className="text-gray-700">
                  Select Pickup Location
                </option>
                {values.pickupLocations.map((location, index) => (
                  <option key={index} className="text-gray-700">
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
