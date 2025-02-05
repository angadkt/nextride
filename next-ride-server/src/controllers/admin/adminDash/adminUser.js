import mongoose from "mongoose";
import Users from "../../../models/authmodel/users.js";

// =================================================================
export const getAllUsers = async (req, res) => {
  const allUserData = await Users.find({ isDeleted: false });
  if (!allUserData)
    return res
      .status(404)
      .json({ success: false, message: `users data not found` });

  return res.status(200).json({
    success: true,
    message: `fetched all users data`,
    data: allUserData,
  });
};

// =============================================================================
export const blockUserAndBlock = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "invalid user id" });
  }

  const specificUser = await Users.findById(id);
  if (!specificUser)
    return res.status(404).json({ success: false, message: `user not found` });

  specificUser.isBlocked = !specificUser.isBlocked;

  await specificUser.save();

  const action = specificUser.isBlocked ? "Blocked" : "Unblocked";

  return res
    .status(200)
    .json({ success: true, message: `user ${action}`, data: specificUser });
};
// ==============================================================

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: `invalid user id` });
  }
  const specificUser = await Users.findById(id);
  if (!specificUser)
    return res.status(404).json({ success: false, message: `user not found` });

  specificUser.isDeleted = true;
  await specificUser.save();

  return res
    .status(200)
    .json({ success: true, message: `user deleted`, data: specificUser });
};
