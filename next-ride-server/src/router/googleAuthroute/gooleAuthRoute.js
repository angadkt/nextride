import express from "express";
import { googleAuth } from "../../controllers/user/authcontroller/authcontroller.js";
// import passport from "passport";

const Authrouter = express.Router();

Authrouter.post("/auth/google", googleAuth)

export default Authrouter
