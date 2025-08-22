import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("Error in Connecting To Database");
    process.exit(1);
  }
};

export default connectDB;
