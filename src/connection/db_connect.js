
import dotenv from "dotenv"
import mongoose from "mongoose";
const connectionString = process.env.MONGO_URL

dotenv.config()

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('MongoDB connectedo a la base de datos Online')
  } catch (error) {
    console.log(`Error: ${error.message}`);
    
  }
}

initMongoDB()

