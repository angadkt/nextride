import express from 'express'
import { tryCatch } from '../../middleware/tryCatch/tryCatch.js'
import { login, register } from '../../controllers/user/authcontroller/authcontroller.js'
import { getProfile } from '../../controllers/user/profileController/getProfile.js'
import { isAuthenticate } from '../../middleware/isAuth/isAuth.js'




const router = express.Router()



router.post("/register", tryCatch(register))
router.post("/login", tryCatch(login))
router.get("/profile", isAuthenticate,tryCatch(getProfile))


export default router