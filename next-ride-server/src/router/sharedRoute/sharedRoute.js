import express from 'express'
import { tryCatch } from '../../middleware/tryCatch/tryCatch.js'
import { getAllAprrovedBikes, getBikesById } from '../../controllers/shared/bikes/bikesContoller.js'

const sharedRouter = express.Router()

sharedRouter.get("/allapprovedbikes", tryCatch(getAllAprrovedBikes))
sharedRouter.get("/bikebyid", tryCatch(getBikesById))

export default sharedRouter