import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    throw new Error("MONGODB_URL environment variable is not set", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  await mongoose.connect(mongoUrl);
};

export default connectDB;
