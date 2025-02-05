import axios from "axios";

export const axiosInstance =  axios.create({
    baseURL:"http://localhost:3888/api/",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})