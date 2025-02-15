import mongoose from "mongoose";


const provider = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        image:{
            type:String,
        },
        license:{
            type:String,
            // required:true
        },
        idCard:{
            type:String,
        },
        address:{
            type:String,
            required:true
        },
        vehicles_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vehicles"
        },
        bookings_id:{
           type:mongoose.Schema.Types.ObjectId,
            ref:"Vehicles"
        },
        isProvider:{
            type:Boolean,
            default:true
        },
        isBlocked:{
            type:Boolean
        },
        isDeleted:{
            type:Boolean
        },
        isApproved:{
            type:Boolean,
            default:false
        },
        emailVerified:{
            type:Boolean,
            default:false
        },
        emailVerificationToken:{
            type:String
        },
        wallet:{
            type:Number,
            default:0
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)

const Providers = mongoose.model("providers", provider)
export default Providers