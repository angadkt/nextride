import express from 'express'
import { tryCatch } from '../../middleware/tryCatch/tryCatch.js'
import { getAllAprrovedBikes } from '../../controllers/shared/bikes/bikesContoller.js'

const sharedRouter = express.Router()

sharedRouter.get("/allapprovedbikes", tryCatch(getAllAprrovedBikes))

export default sharedRouter