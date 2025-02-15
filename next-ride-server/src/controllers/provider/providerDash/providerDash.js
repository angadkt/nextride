import Bikes from "../../../models/bikeModel/bikesModel.js";
import Providers from "../../../models/providersModel/providers.js";

// ================================ Add Bikes =================================
export const addBikes = async (req, res) => {
  const id = req.user;
  console.log("files check",req.files)
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
  } = req.body;

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
    // !registrationCertificate ||
    !pickUpLocations
  ) {
    return res.status(400).json({ success: false, message: `invalid input` });
  }

  // const  bikeImage  = req.file.path;
  // console.log("image", bikeImage)
  // if (!bikeImage ) {
  //   return res
  //     .status(404)
  //     .json({ status: false, message: `image files not found` });
  // }

  // const  registrationCertificate  = req.file.path;
  // console.log("image", bikeImage)
  // if (!bikeImage ) {
  //   return res
  //     .status(404)
  //     .json({ status: false, message: `image files not found` });
  // }

  // const { bikeImage, registrationCertificate } = req.files;
  const { bikeImage, registrationCertificate } = req.files || {};
  if (!bikeImage || !bikeImage[0] || !registrationCertificate || !registrationCertificate[0]) {
    return res.status(400).json({
      success: false,
      message: "Both bikeImage and registrationCertificate are required.",
    });
  }
  // console.log("bike", bikeImage[0].path)
  // console.log("reg", registrationCertificate[0].path)
  // if (!bikeImage) {
  //   return res
  //     .status(404)
  //     .json({ status: false, message: `image files not found` });
  // }

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

// ====================================================================
// export const temp = async (req, res) => {
//   const {brand, name} = req.body
//   console.log("brand",brand)
//   console.log("name",name)
//   return res.status(200)
// }

export const getSpecificProvider = async (req, res) => {
  const providerId = req.user;
  if (!providerId) {
    return res
      .status(400)
      .json({
        success: false,
        message: `provider id not found, please login `,
      });
  }
  const specificProvider = await Providers.findById(providerId);
  if (!specificProvider) {
    return res.status(400).json({ success: false, message: `please login ` });
  }

  return res.status(200).json({success:true, message:`providers data fetched` , data:specificProvider})
};
