import axios from "axios"

export const fetchUsers = async () => {
    const {data} = await axios.get("http://localhost:3888/api/user/profile")
    return data
}