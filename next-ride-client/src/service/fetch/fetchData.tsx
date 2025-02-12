import { axiosInstance } from "@/Axios/axiosInstance"


export const  getSpecificUsers = async() =>{
    const data = await axiosInstance.get("user/profile", {withCredentials: true})
    console.log(data.data);
 return data.data
}

export const getAlluserData = async () => {
    const response = await axiosInstance.get("admin/getallusers")
    console.log("response", response)
    return response.data
}

// ========================== block and unblock user =============================================
export const handleBlockAndUnblock = async (userId: any) => {
    const response = await axiosInstance.put(`admin/blockandunblock/${userId}`)
    console.log("blockresponse check", response)
    return response.data
}
// =============================================================

//delete user
export const handleDeleteUser = async (userId: any) => {
    const response = await axiosInstance.put(`admin/deleteuser/${userId}`)
    console.log(response.data)
    return response.data
}


// ====================================================================
export const handleAdminLogout = async() =>{
    const response = await axiosInstance.post('admin/adminlogout')
    console.log(response.data)
    return response.data
}
