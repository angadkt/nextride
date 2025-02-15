import express from "express";
import {
  providerLogin,
  providerRegister,
  verifyEmail,
} from "../../controllers/provider/providerAuthController/providerAuth.js";
import { tryCatch } from "../../middleware/tryCatch/tryCatch.js";
import upload from "../../middleware/uploadMiddleware/uploadMiddleware.js";
import {
  addBikes,
  getLiveBikes,
  getPendingBikes,
  getSpecificProvider,
} from "../../controllers/provider/providerDash/providerDash.js";
import { isAuthenticate } from "../../middleware/isAuth/isAuth.js";

const ProviderRouter = express.Router();

//provider auth
ProviderRouter.post(
  "/register",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "idCard", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  tryCatch(providerRegister)
);
ProviderRouter.get("/verify-email", verifyEmail);
ProviderRouter.post("/login", tryCatch(providerLogin));
// ===============================================================

//provider dash
//bikes
ProviderRouter.post(
  "/addbikes",
  upload.fields([
    { name: "bikeImage", maxCount: 1 },
    { name: "registrationCertificate", maxCount: 1 },
  ]),
  isAuthenticate,
  tryCatch(addBikes)
);
ProviderRouter.get("/getLivebikes", isAuthenticate,tryCatch(getLiveBikes));
ProviderRouter.get("/getpendnigbikes",isAuthenticate ,tryCatch(getPendingBikes));

// ProviderRouter.post('/temp', tryCatch(temp))
ProviderRouter.get("/getspecificprovider" ,isAuthenticate ,tryCatch(getSpecificProvider))
export default ProviderRouter;
