import Users from "../../../models/authmodel/users.js"

export const getProfile =  async(req,res) =>{
    const userId = req.user._id
    console.log("user id", userId)
    const existingUser = await Users.findById(userId).select("-password")
    if(!existingUser){
        return res.status(404).json({success:false, message:`user not found`})
    }
    
    return res.status(200).json({success:true, message:`user data fetched successfully`, data:existingUser})
}