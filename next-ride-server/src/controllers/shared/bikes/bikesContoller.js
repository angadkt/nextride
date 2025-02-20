import Bikes from "../../../models/bikeModel/bikesModel.js";

//get all approved bikes
//-- shared  -> admin / user
export const getAllAprrovedBikes = async (req, res) => {
  const allApprovedBikes = await Bikes.find({ isApproved: true });
  if (!allApprovedBikes) {
    return res
      .status(400)
      .json({ success: false, message: `bikes cannot be obtained` });
  }
  return res
    .status(200)
    .json({
      success: false,
      message: `all listed bikes fetched`,
      data: allApprovedBikes,
    });
};
