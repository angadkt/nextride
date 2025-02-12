import mongoose from "mongoose";

const bikes = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bikeImage: {
    type: String,
    // required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  kmDriven:{
    type:String,
    required:true
  },
  mileage:{
    type:String,
    required:true
  },
  price:{
    type:Number || String,
    default:0
  },
  DlNumber:{
    type:String,
    required:true
  },
  registrationCertificate: {
    type: String,
    // required: true,
  },
  pickUpLocations: {
    type: [String],
    required: true,
  },
  mainLocation: {
    type: String,
    required: true,
  },
  isavailable:{
    type:String,
    default:true
  },
  quantityAvailable:{
    type:Number,
    default:1
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  providersId:{
    type:mongoose.Types.ObjectId,
    ref:"Providers"
  }
});


const Bikes = mongoose.model("bikes", bikes)
export default Bikes