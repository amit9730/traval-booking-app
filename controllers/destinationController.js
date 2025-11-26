import Destination from "../models/Destination.js";

// GET ALL
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json({
      success: true,
      destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load destinations",
    });
  }
};

// GET SINGLE BY SLUG
export const getDestination = async (req, res) => {
  try {
    const { slug } = req.params;

    const dest = await Destination.findOne({ slug });

    if (!dest) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.json({
      success: true,
      destination: dest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching destination",
    });
  }
};


