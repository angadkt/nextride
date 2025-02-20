import Admin from "../../../models/adminmodel/admin.js";
import Bikes from "../../../models/bikeModel/bikesModel.js";
import Booking from "../../../models/bookingModel/bookingModel.js";

export const bookBike = async (req, res) => {
  const userId = req.user
  const { bikeId, pickUpDate, dropOffDate, pickUpTime, dropOffTime ,cost ,providersId } = req.body;

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
    cost,
    providersId,
  });
  await booking.save();

  const isAdmin = await Admin.findOne()
  if(isAdmin){
    return res
    .status(404)
    .json({ success: false, message: `admin data fetching failed` });
  }

  isAdmin.wallet += cost

  await isAdmin.save()

  res.status(200).json({ success: true, message: "bike booked successfully",data:booking });
};

// ======================================================

//get available bikes

export const availableBikes = async (req, res) => {
  const id = req.user;
  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: `please login to find the bikes` });
  }

  const availableBikes = await Bikes.find({
    isApproved: true,
    isavailable: true,
  });
  if (!availableBikes) {
    return res
      .status(404)
      .json({ success: false, message: `NO BIKES AVAILABLE` });
  }
  return res.status(200).json({
    success: true,
    message: `available bikes fetched`,
    data: availableBikes,
  });
};

//getSelectedBike
export const getSelectedBike = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    return res.status(400).json({ success: false, message: `user not found, please login to continue` });
  }
  const bikeId = req.params.id;
  if (!bikeId) {
    return res.status(400).json({ success: false, message: `select the bike` });
  }
  const selBike = await Bikes.findById(bikeId);
  if (!selBike) {
    return res.status(400).json({ success: false, message: `bike not found` });
  }

  return res
    .status(200)
    .json({
      success: true,
      message: `selected bike data fetched`,
      data: selBike,
    });
};
