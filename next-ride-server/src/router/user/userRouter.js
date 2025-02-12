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
import { login, register } from "../../controllers/user/authcontroller/authcontroller.js";

const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));
router.get("/profile", isAuthenticate, tryCatch(getProfile));


// router.get("/get")



// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   tryCatch(googleAuth)
// );
// ✅ Google OAuth - Redirect
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // ✅ Google OAuth - Callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("http://localhost:3000"); // Redirect to frontend
//   }
// );


export default router;
