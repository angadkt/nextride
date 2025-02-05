import express from 'express'
import { adminLogout, adminRegister } from '../../controllers/admin/adminAuth/adminAuth.js'
import { tryCatch } from '../../middleware/tryCatch/tryCatch.js'
import {  blockUserAndBlock, deleteUser, getAllUsers } from '../../controllers/admin/adminDash/adminUser.js'








const router = express.Router()

router.post('/adminregister', tryCatch(adminRegister)) 
router.get('/getallusers', tryCatch(getAllUsers))
router.put('/blockandunblock/:id', tryCatch(blockUserAndBlock))
router.put('/deleteuser/:id' , tryCatch(deleteUser))
router.post('/adminlogout', tryCatch(adminLogout))


export default router