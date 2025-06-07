import Booking from '../../../models/bookingModel/bookingModel.js';

export const getFilteredBookings = async (req, res) => {
  try {
    const {
      providerId,
      userId,
      bikeId,
      isPickedUp,
      isCancelled,
      isClear,
      fromDate,
      toDate
    } = req.query;

    if (!providerId) {
      return res.status(400).json({ message: "provider's id not found" });
    }

    const filter = {
      providersId: providerId.trim()
    };

    if (userId) filter.userId = userId.trim();
    if (bikeId) filter.bikeId = bikeId.trim();

    if (isPickedUp !== undefined) filter.isPickedUp = isPickedUp === 'true';
    if (isCancelled !== undefined) filter.isCancelled = isCancelled === 'true';
    if (isClear !== undefined) filter.isClear = isClear === 'true';

    if (fromDate || toDate) {
      filter.pickupDate = {};
      if (fromDate) filter.pickupDate.$gte = new Date(fromDate);
      if (toDate) filter.pickupDate.$lte = new Date(toDate);
    }

    console.log("filter", filter)

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for the given filter" });
    }

    return res.status(200).json({ message: "Fetched successfully", data: bookings });
  } catch (error) {
    console.error("Error in getFilteredBookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
