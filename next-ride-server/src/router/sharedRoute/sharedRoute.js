import express from 'express'
import { tryCatch } from '../../middleware/tryCatch/tryCatch.js'
import { getAllAprrovedBikes, getBikesById } from '../../controllers/shared/bikes/bikesContoller.js'
import { getFilteredBookings } from '../../controllers/shared/bookings/sharedBookingController.js'

const sharedRouter = express.Router()

sharedRouter.get("/allapprovedbikes", tryCatch(getAllAprrovedBikes))
sharedRouter.get("/bikebyid", tryCatch(getBikesById))
sharedRouter.get("/getfilteredbooking", tryCatch(getFilteredBookings))

export default sharedRouter