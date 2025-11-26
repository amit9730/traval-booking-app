import express from "express";
import { addBooking, getMyBookings } from "../controllers/bookingController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addBooking);
router.get("/mine", auth, getMyBookings);

export default router;
