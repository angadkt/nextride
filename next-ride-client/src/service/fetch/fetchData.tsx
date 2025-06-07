import { axiosInstance } from "@/Axios/axiosInstance";
import { AxiosResponse } from "axios";

export const getSpecificUsers = async () => {
  const data = await axiosInstance.get("user/profile", {
    withCredentials: true,
  });
  console.log(data.data);
  return data.data;
};

//------------------------ admin -------------------------
export const getAlluserData = async () => {
  const response = await axiosInstance.get("admin/getallusers");
  console.log("response", response);
  return response.data;
};

// ========================== block and unblock user =============================================
export const handleBlockAndUnblock = async (userId: any) => {
  const response = await axiosInstance.put(`admin/blockandunblock/${userId}`);
  console.log("blockresponse check", response);
  return response.data;
};
// =============================================================

//delete user
export const handleDeleteUser = async (userId: any) => {
  const response = await axiosInstance.put(`admin/deleteuser/${userId}`);
  console.log(response.data);
  return response.data;
};

// ====================================================================
export const handleAdminLogout = async () => {
  const response = await axiosInstance.post("admin/adminlogout");
  console.log(response.data);
  return response.data;
};

//bikes
export const getAllpendingBikes = async () => {
  const response = await axiosInstance.get("admin/getallpendingbikes");
  console.log("pending bike data", response.data);
  return response.data;
};

//get all live bike

// ----------------------------------------------------------------------------

// ================= providers auth ==========================
// export const handleProivdersLogin = async ()=>{
//     const response = await axiosInstance.post("/provider/login")
//     console.log("provider login" , response.data)
//     return response.data
// }

// ======================================
//providers
export const specificProvider = async () => {
  const response = await axiosInstance.get("/provider/getspecificprovider");
  console.log("specific provider", response);
  return response.data;
};

//all bikes
export const getMyBikes = async () => {
  const response = await axiosInstance.get("provider/getmybikes");
  // console.log("response", response.data.d)
  return response.data;
};

export const getBikeById = async (bikeId: string) => {
  const response = await axiosInstance.get("shared/bikebyid", {
    params: { bikeId },
  });
  return response.data;
};

//users --------------------------------------------
//all approved or listed bikes
export const getAllApprovedBikes = async () => {
  const response = await axiosInstance.get("/user/getavailablebikes");
  console.log("fetched bikes = ", response?.data);
  return response.data;
};

export const getSelectedBikes = async (bikeId: any) => {
  const response = await axiosInstance.get(`/user/getelectedbike/${bikeId}`);
  console.log("selected bikes", response.data);
  return response.data;
};

export const getNumberOfDays = (startDate: string, endDate: string): number => {
  // Convert string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Get the difference in milliseconds
  const differenceInMillis = end.getTime() - start.getTime();

  // Convert milliseconds to days
  const days = differenceInMillis / (1000 * 3600 * 24);

  // Return the absolute number of days
  return Math.floor(days);
};

//=====================================

export const getTopBikes = async () => {
  const response = await axiosInstance.get(`/user/topbikes`);
  console.log("top-bikes", response.data);
  return response.data;
};


//findBikes
export const findBikes = async (location:any) =>{
  const resposnse  =  await axiosInstance.get(`/user/findbike`,{
    params : {location}
  })

  return resposnse.data
}

//getMainLocations
export const getMainLocations = async () => {
  const response = await axiosInstance.get('/user/mainlocations')
  return response.data
}


//getBookingsDataperUer
export const getBookingsData = async() => {
  const response = await axiosInstance.get("/user/getmybookings")
  return response.data?.data
}


//cancel booking &  clear canceled booking

// export const  get
