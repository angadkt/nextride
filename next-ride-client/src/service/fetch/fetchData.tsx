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



//bikes
// export const getAllBikes = async ()=> {
//     const response = await axiosInstance.get('')
// }


// ================= providers auth ==========================
// export const handleProivdersLogin = async ()=>{
//     const response = await axiosInstance.post("/provider/login")
//     console.log("provider login" , response.data)
//     return response.data
// }


//providers
export const specificProvider = async () => {
    const response = await axiosInstance.get('/provider/getspecificprovider')
    console.log("specific provider" , response)
    return response.data
}