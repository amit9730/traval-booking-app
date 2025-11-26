import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    date: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
