const Trip = require("../models/Trip"); // Assuming you have a Trip model
const User = require("../models/User");

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate, status, cover_img } = req.body;

    const trip = await Trip.create({
      title,
      description,
      location,
      startDate,
      endDate,
      status: status || "planned",
      cover_img,
      UserId: req.user.id,
    });

    res.status(201).json({ message: "Trip created successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Error creating trip", error: error.message });
  }
};

// Get all trips for the logged-in user
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({ where: { UserId: req.user.id } });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

// Get trip detail by ID
exports.getTripDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findOne({
      where: { id, UserId: req.user.id },
      include: [{ model: User, attributes: ["id", "full_name", "imgix_url"] }],
    });

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip", error });
  }
};

// Update trip
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, startDate, endDate, status, cover_img } = req.body;

    const trip = await Trip.findOne({ where: { id, UserId: req.user.id } });

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (title !== undefined) trip.title = title;
    if (description !== undefined) trip.description = description;
    if (location !== undefined) trip.location = location;
    if (startDate !== undefined) trip.startDate = startDate;
    if (endDate !== undefined) trip.endDate = endDate;
    if (status !== undefined) trip.status = status;
    if (cover_img !== undefined) trip.cover_img = cover_img;

    await trip.save();
    res.status(200).json({ message: "Trip updated successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Error updating trip", error });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findOne({ where: { id, UserId: req.user.id } });

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    await trip.destroy();
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip", error });
  }
};
