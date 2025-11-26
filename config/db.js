import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      family: 4,
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default connectDB;
