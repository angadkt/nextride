import Bikes from "../../../models/bikeModel/bikesModel.js";

//approve the bike request sent by the admin
export const approveBikes = async (req, res) => {
  const { price } = req.body;
  const bikeId = req.params.bikeId;

  if (!price) {
    return res.status(400).json({ success: false, message: `add the price` });
  }

  const bikeExist = await Bikes.findById(bikeId);
  if (!bikeExist) {
    return res.status(400).json({ success: false, message: `bike not found` });
  }
  bikeExist.price = price;
  bikeExist.isApproved = true;

  await bikeExist.save();

  return res.status(200).json({
    success: true,
    message: `bike is ready for booking`,
    data: bikeExist,
  });
};

//=============================================================

export const getAllPendingBikesAdmin = async (req, res) => {
  const AllPendingBikes = await Bikes.find({ isApproved: false });
  if (!AllPendingBikes) {
    return res.status(400).json({ success: false, message: `bike not found` });
  }
  return res.status(200).json({
    success: true,
    message: `pending bike data fetched successfully `,
    data: AllPendingBikes,
  });
};

//delete bike request
export const deleteBikeRequest = async (req, res) => {
  const bikeId = req.params.id;
  if (!bikeId) {
    return res.status(400).json({ success: false, message: `invalid Id` });
  }
  const deletedReq = await Bikes.findByIdAndDelete(bikeId);
  if (!deletedReq) {
    return res
      .status(400)
      .json({ success: false, message: `bike requst not found` });
  }
  return res
    .status(200)
    .json({ success: false, message: `requset deleted`, data: deletedReq });
};
