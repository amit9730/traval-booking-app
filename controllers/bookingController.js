import Booking from "../models/Booking.js";

export const addBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.userId,
    destination: req.body.destination,
    date: req.body.date,
  });

  res.json(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.userId }).populate("destination");
  res.json(bookings);
};
