"use client";

import { axiosInstance } from "@/Axios/axiosInstance";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  pickupLocations: string[]; // Array of strings
  bikeImage: File | null;
  rcImage: File | null;
}

export default function AddBikeForm() {
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
        return value && value.size <= 2000000; // Max 2MB
      }),
  });

  // Handle form submission
  const handleSubmit = async (values: BikeFormValues ,{ resetForm }:any) => {
    try {
      const formData = new FormData();
      formData.append("brand", values.brand);
      formData.append("name", values.name);
      formData.append("engine", values.engineCc);
      formData.append("kmDriven", values.kmDriven);
      formData.append("mileage", values.mileage);
      formData.append("DlNumber", values.dlNumber);
      formData.append("mainLocation", values.mainLocation);
      formData.append("bikeImage", values.bikeImage as File);
      formData.append("registrationCertificate", values.rcImage as File);
  
      // Add pickup locations as an array
      values.pickupLocations.forEach((location, index) => {
        formData.append(`pickUpLocations[${index}]`, location);
      });
  
      const response = await axiosInstance.post("/provider/addbikes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Bike added successfully", response.data);
      toast("bike added to the admins panel")
      resetForm()
    } catch (err) {
      console.log("error occured adding bike", err)
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-5 border p-10">
          {/* Row 1 */}
          <div className="flex gap-5">
            <Field
              className="w-80 border p-2"
              name="brand"
              placeholder="brand"
            />
            <ErrorMessage
              name="brand"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field className="w-80 border p-2" name="name" placeholder="name" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Row 2 */}
          <div className="flex gap-5">
            <Field
              className="w-80 border p-2"
              name="engineCc"
              placeholder="engine cc"
            />
            <ErrorMessage
              name="engineCc"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              className="w-80 border p-2"
              name="kmDriven"
              placeholder="km driven"
            />
            <ErrorMessage
              name="kmDriven"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Row 3 */}
          <div className="flex gap-5">
            <Field
              className="w-80 border p-2"
              name="mileage"
              placeholder="mileage"
            />
            <ErrorMessage
              name="mileage"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              className="w-80 border p-2"
              name="dlNumber"
              placeholder="DL number"
            />
            <ErrorMessage
              name="dlNumber"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Row 4 - Main Location and Pickup Locations */}
          <div className="flex gap-5">
            <Field
              className="w-80 border p-2"
              name="mainLocation"
              placeholder="Main location"
            />
            <ErrorMessage
              name="mainLocation"
              component="div"
              className="text-red-500 text-sm"
            />
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
        </Form>
      )}
    </Formik>
  );
}
