import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bikeId: {
      type: mongoose.Types.ObjectId,
      ref: "bikes",
      required: true,
    },
    mainLocation: {
      type: String,
      // required: true,
    },
    pickUpLocation: {
      type: String,
      // required: true,
    },
    pickUpDate: {
      type: Date,
      required: true,
    },
    dropOffDate: {
      type: Date,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
    },
    dropOffTime: {
      type: String,
      required: true,
    },
    totalCost: {
      type: String,
      required: true,
    },
    providersId: {
      type: mongoose.Types.ObjectId,
      ref: "Providers",
      required: true,
    },
    isCanceled: {
      type:Boolean,
      default: false
    },
    isPickedUp:{
      type:Boolean,
      default:false
    },
    isClear:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
