import Bikes from "../../../models/bikeModel/bikesModel.js";

export const approveBikes = async (req, res) => {
  const bikeId = req.params.bikeId;

  const bikeExist = await Bikes.findById(bikeId);
  if (!bikeExist) {
    return res.status(400).json({ success: false, message: `bike not found` });
  }

  // ============= condition for the cheking of images and documents =========

  // =================================================================

  bikeExist.isApproved = true;

  await bikeExist.save();

  return res
    .status(200)
    .json({ success: true, message: `bike is ready for booking` });
};
