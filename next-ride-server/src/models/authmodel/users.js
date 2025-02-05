import mongoose from "mongoose";

const users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    age: {
      type: Number,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    favourite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favourite",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", users)
export default Users