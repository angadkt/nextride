import Bikes from "../../../models/bikeModel/bikesModel.js";

export const approveBikes = async (req, res) => {
  const { price } = req.body;
  const bikeId = req.params.bikeId;

  if(!price){
    return res.status(400).json({success:false, message:`add the price`})
  }

  const bikeExist = await Bikes.findById(bikeId);
  if (!bikeExist) {
    return res.status(400).json({ success: false, message: `bike not found` });
  }
  bikeExist.price = price;
  bikeExist.isApproved = true;

  await bikeExist.save();

  return res
    .status(200)
    .json({ success: true, message: `bike is ready for booking` , data:bikeExist });
};

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
