import Booking from "../../../models/bookingModel/bookingModel";

export const bookBike = async (req, res) => {
  const userId = req.params.id;
  const { bikeId, pickUpDate, dropOffDate, pickUpTime, dropOffTime } = req.body;

  const existbooking = await Booking.findOne({
    userId,
    dropOffDate: { $gte: new Date() },
  });

  if (existbooking) {
    return res
      .status(404)
      .json({ success: false, message: `you already have live booking` });
  }

  const booking = new Booking({
    userId,
    bikeId,
    pickUpDate,
    dropOffDate,
    pickUpTime,
    dropOffTime,
  })
  await booking.save()

  res.status(200).json({success:true, message:"bike booked successfully"})
};
