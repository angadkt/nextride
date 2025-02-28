import express from 'express'
import { adminLogout, adminRegister } from '../../controllers/admin/adminAuth/adminAuth.js'
import { tryCatch } from '../../middleware/tryCatch/tryCatch.js'
import {  blockUserAndBlock, deleteUser, getAllUsers } from '../../controllers/admin/adminDash/adminUser.js'
import {  approveProviderRequest, getApprovedProviders, getUnApprovedProviders, } from '../../controllers/admin/adminDash/adminProvider.js'
import { approveBikes, deleteBikeRequest, getAllPendingBikesAdmin } from '../../controllers/admin/adminBikes/adminBikes.js'








const router = express.Router()

//admin auth route
router.post('/adminregister', tryCatch(adminRegister)) 
router.post('/adminlogout', tryCatch(adminLogout))


//admin users route
router.get('/getallusers', tryCatch(getAllUsers))
router.put('/blockandunblock/:id', tryCatch(blockUserAndBlock))
router.put('/deleteuser/:id' , tryCatch(deleteUser))


//admin providers route
router.get('/verifyedproviders', tryCatch(getApprovedProviders))
router.get('/unverifyedproviders',tryCatch(getUnApprovedProviders))
router.put('/approveRequest/:id',tryCatch(approveProviderRequest))

//admin bikes
router.put('/approvebike/:bikeId',tryCatch(approveBikes))
router.get('/getallpendingbikes', tryCatch(getAllPendingBikesAdmin))
router.delete('/deleterequest/:id' , tryCatch(deleteBikeRequest ))

export default router