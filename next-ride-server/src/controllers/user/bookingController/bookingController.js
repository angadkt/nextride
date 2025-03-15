import Admin from "../../../models/adminmodel/admin.js";
import Bikes from "../../../models/bikeModel/bikesModel.js";
import Booking from "../../../models/bookingModel/bookingModel.js";

export const bookBike = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "user not found please login" });
  }

  const {
    bikeId,
    pickUpDate,
    dropOffDate,
    pickUpTime,
    dropOffTime,
    mainLocation,
    pickUpLocation,
    totalCost,
    providersId,
  } = req.body;

  if (!totalCost || isNaN(totalCost)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid total cost." });
  }

  const existbooking = await Booking.findOne({
    userId,
    dropOffDate: { $gte: pickUpDate },
  });

  if (existbooking) {
    return res.status(404).json({
      success: false,
      message: `you already have booking on the date`,
    });
  }

  const booking = new Booking({
    userId,
    bikeId,
    pickUpDate,
    dropOffDate,
    pickUpTime,
    dropOffTime,
    mainLocation,
    pickUpLocation,
    providersId,
    totalCost: Number(totalCost),
  });
  await booking.save();

  const isAdmin = await Admin.findOne();
  if (!isAdmin) {
    return res
      .status(404)
      .json({ success: false, message: `admin data fetching failed` });
  }

  isAdmin.wallet += Number(totalCost);

  await isAdmin.save();

  res.status(200).json({
    success: true,
    message: "bike booked successfully",
    data: booking,
  });
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
    return res.status(400).json({
      success: false,
      message: `user not found, please login to continue`,
    });
  }
  const bikeId = req.params.id;
  if (!bikeId) {
    return res.status(400).json({ success: false, message: `select the bike` });
  }
  const selBike = await Bikes.findById(bikeId);
  if (!selBike) {
    return res.status(400).json({ success: false, message: `bike not found` });
  }

  return res.status(200).json({
    success: true,
    message: `selected bike data fetched`,
    data: selBike,
  });
};

//getTopbikes
export const getTopBikes = async (req, res) => {
  const allBikes = await Bikes.find();
  if (!allBikes) {
    return res.status(400).json({ success: false, message: "bikes not found" });
  }
  const topBikes = allBikes.filter((item) => item.price > 2000);
  if (!topBikes) {
    return res.status(400).json({ success: false, message: `no bikes found` });
  }
  return res.json({ topBikes });
};

//find bikes
export const findBike = async (req, res) => {
  const { location } = req.query; // location is an object
  console.log("location", location);
  if (!location) {
    return res
      .status(400)
      .json({ success: false, message: "Location is required" });
  }

  const availableBikes = await Bikes.find({
    isavailable: true,
    isApproved: true,
  });

  if (availableBikes.length === 0) {
    return res.status(404).json({ success: false, message: "No bikes found" });
  }

  const filteredBikes = availableBikes.filter(
    (item) => item.mainLocation === location
  );

  return res
    .status(200)
    .json({ success: true, message: "Bikes found", data: filteredBikes });
};

//getMainlocations
export const getMainLocation = async (req, res) => {
  const mainLocations = await Bikes.distinct("mainLocation");
  if (!mainLocations) {
    return res.status(400).json({ message: "No locations found" });
  }
  return res.status(200).json({ data: mainLocations });
};

// ==================================================


//get bookings bikes data per user
export const getBookedBikes = async (req, res) => {
  const usersId = req.user;
  if (!usersId) {
    return res.status(400).json({ message: "user id not found" });
  }
  const bookingsData = await Booking.find({userId:usersId}).populate("bikeId")
  if(!bookingsData){
    return res.status(400).json({message:"your booking data not found"})
  }
  return res.status(200).json({message:"fetching bookings data successful", data:bookingsData})
};
