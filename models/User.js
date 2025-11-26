// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hashed password
});

export default mongoose.model("User", userSchema);
