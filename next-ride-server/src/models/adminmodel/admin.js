import mongoose from "mongoose";


const admin = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        wallet:{
            type:Number,
            default:0
        },
    }
)

const Admin = mongoose.model("admin", admin)
export default Admin