import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();

// Serve uploads folder
import path from "path";
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



// ✅ Universal Localhost CORS Fix
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// BODY PARSER
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", reviewRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);


