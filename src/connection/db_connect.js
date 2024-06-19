import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectionString = "mongodb+srv://devrogerzen_root:9jGhZ6RMIGef1I85@cluster0.xdrtm9e.mongodb.net/coderhouse_backend1?retryWrites=true&w=majority&appName=Cluster0";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connectedo a la base de datos Online");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

initMongoDB();