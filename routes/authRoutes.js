// import express from "express";
// import jwt from "jsonwebtoken";   // <-- ADD THIS
// import { registerUser, loginUser } from "../controllers/authController.js";

// const router = express.Router();

// // USER ROUTES
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // ADMIN LOGIN ROUTE
// router.post("/admin-login", async (req, res) => {
//   const { email, password } = req.body;

//   // Static admin check
//   if (email !== "admin@gmail.com" || password !== "admin123") {
//     return res.status(400).json({ message: "Invalid Admin Credentials" });
//   }

//   // Generate Admin Token
//   const token = jwt.sign(
//     { role: "admin" },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.json({
//     message: "Admin Login Successful",
//     token
//   });
// });

// export default router;

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
