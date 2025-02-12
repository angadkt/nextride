import mongoose from "mongoose";

const users = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
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
      // required: true,
    },
    mobile: {
      type: String,
      // required: true,
    },
    image:{
      type:String,
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
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", users);
export default Users;
