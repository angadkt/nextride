import Bikes from "../../../models/bikeModel/bikesModel.js";
import Booking from "../../../models/bookingModel/bookingModel.js";
import Providers from "../../../models/providersModel/providers.js";

// ================================ Add Bikes =================================
export const addBikes = async (req, res) => {
  const id = req.user;
  console.log("files check", req.files);
  const {
    brand,
    name,
    // image,
    engine,
    kmDriven,
    mileage,
    DlNumber,
    // registrationCertificate,
    pickUpLocations,
    mainLocation,
    year,
  } = req.body;

  console.log("year", year);
  // console.log("hello", req.body);
  if (
    !mainLocation ||
    !brand ||
    !name ||
    // !image ||
    !engine ||
    !kmDriven ||
    !mileage ||
    !DlNumber ||
    !year ||
    // !registrationCertificate ||
    !pickUpLocations
  ) {
    return res.status(400).json({ success: false, message: `invalid input` });
  }
  const { bikeImage, registrationCertificate } = req.files || {};
  if (
    !bikeImage ||
    !bikeImage[0] ||
    !registrationCertificate ||
    !registrationCertificate[0]
  ) {
    return res.status(400).json({
      success: false,
      message: "Both bikeImage and registrationCertificate are required.",
    });
  }
  const bikeExist = await Bikes.findOne({ DlNumber });
  if (bikeExist)
    return res.status(404).json({
      status: false,
      message: `bike with this registration already exist`,
    });

  const newBike = new Bikes({
    brand,
    name,
    bikeImage: bikeImage[0].path,
    engine,
    kmDriven,
    mileage,
    DlNumber,
    registrationCertificate: registrationCertificate[0].path,
    pickUpLocations,
    mainLocation,
    year,
    providersId: id,
  });

  await newBike.save();

  return res.status(200).json({
    success: true,
    message: `request sent to the admin`,
    data: newBike,
  });
};

// ================================= getBikes ==================================
export const getLiveBikes = async (req, res) => {
  const id = req.user;
  const bikes = await Bikes.find({ isApproved: true, providersId: id });
  if (!bikes)
    return res.status(400).json({ success: false, message: "bikes not found" });

  return res.status(200).json({
    success: false,
    message: `bikes fetched successfully`,
    data: bikes,
  });
};

// ============================ get pending bikes =========================
// pending bikes = not approved by the admin
export const getPendingBikes = async (req, res) => {
  const id = req.user;
  const pendingBikes = await Bikes.find({ isApproved: false, providersId: id });
  if (!pendingBikes)
    return res
      .status(400)
      .json({ success: false, message: "pending bikes not found" });

  return res.status(200).json({
    success: false,
    message: `Pending bikes fetched successfully`,
    data: pendingBikes,
  });
};

// ==============================================

//get all bikes of the particular provider
export const getMyBikes = async (req, res) => {
  const id = req.user;
  if (!id) {
    return res.status(404).json({ success: false, message: "please login" });
  }
  const Mybikes = await Bikes.find({ providersId: id });
  if (!Mybikes) {
    return res.status(404).json({ success: false, message: "no bikes found" });
  }
  return res.status(200).json({
    success: true,
    message: `my bikes fetched successfully`,
    data: Mybikes,
  });
};

// ====================================================================
// export const temp = async (req, res) => {
//   const {brand, name} = req.body
//   console.log("brand",brand)
//   console.log("name",name)
//   return res.status(200)
// }

// ================================================
// delete approved bikes

export const deleteListedBike = async (req, res) => {
  const id = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "bike id not found in the database" });
  }

  const deleteListedBike = await Bikes.findByIdAndDelete(id);
  if (!deleteListedBike) {
    return res.status(400).json({ message: "failed to delete" });
  }

  return res.status(200).json({ message: "your bike deleted successfully" });
};


// ================================
// to change booked bike status to picked up

export const changeBikeStatus = async (req, res) => {
  const bookingId = req.params;
  if (!bookingId) {
    return res.status(400).json({ message: "credentials not found" });
  }

  const changeStatus = await Booking.findByIdAndUpdate(
    id,
    { isPickedUp: true },
    { new: true }
  );
  if (!changeStatus) {
    return res.status(400).json({ message: "operation failed" });
  }

  return res.status(200).json({ message: "status changed" });
};


