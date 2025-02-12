import Providers from "../../../models/providersModel/providers.js";

// ===============================================================
export const getApprovedProviders = async (req, res) => {
  const ApprovedProviders = await Providers.find({ isApproved: true });
  if (!ApprovedProviders)
    return res
      .status(400)
      .json({ success: false, message: `approved providers not found` });

  return res.status(200).json({
    success: true,
    message: "fetched providers data",
    data: ApprovedProviders,
  });
};

// ==========================================================================
export const getUnApprovedProviders = async (req, res) => {
  const unApprovedProviders = await Providers.find({ isApproved: false });
  if (!unApprovedProviders) {
    return res
      .status(400)
      .json({ success: false, message: `approved providers not found` });
  }
  return res.status(200).json({
    success: true,
    message: `fetched providers data`,
    data: unApprovedProviders,
  });
};
// ===================================================================

export const approveProviderRequest = async (req, res) => {
  console.log("hello check")
  const id = req.params.id;
  const specificProvider = await Providers.findById(id);
  if (!specificProvider) {
    return res
      .status(400)
      .json({ success: false, message: "provider data not found" });
  }
  specificProvider.isApproved = true;
  await specificProvider.save();
  return res.status(200).json({ success: true, message: "admin approved" });
};
