import express from "express";
import { tryCatch } from "../../middleware/tryCatch/tryCatch.js";
// import {
//   googleAuth,
//   login,
//   register,
// } from "../../controllers/user/authcontroller/authcontroller.js";
import { getProfile } from "../../controllers/user/profileController/getProfile.js";
import { isAuthenticate } from "../../middleware/isAuth/isAuth.js";
// import passport from "passport";
import {
  googleAuth,
  login,
  register,
} from "../../controllers/user/authcontroller/authcontroller.js";
import {
  availableBikes,
  getSelectedBike,
} from "../../controllers/user/bookingController/bookingController.js";

const router = express.Router();

//auth
router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));
router.get("/profile", isAuthenticate, tryCatch(getProfile));

//googleauth
router.post("/auth/google-login", tryCatch(googleAuth));

//bikes
router.get("/getavailablebikes", isAuthenticate, tryCatch(availableBikes));
router.get("/getelectedbike/:id", isAuthenticate, tryCatch(getSelectedBike));

// router.get("/get")

export default router;
