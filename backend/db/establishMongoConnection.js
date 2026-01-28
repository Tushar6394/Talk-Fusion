import mongoose from "mongoose";

const establishMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error("Error message:", error.message);
    console.error("\n⚠️  IMPORTANT: Please check the following:");
    console.error("1. Your IP address needs to be whitelisted in MongoDB Atlas");
    console.error("2. Go to: https://cloud.mongodb.com/");
    console.error("3. Navigate to: Network Access > Add IP Address");
    console.error("4. Add your current IP or use 0.0.0.0/0 for development (not recommended for production)");
    console.error("\n📌 The server will continue running, but database operations will fail until MongoDB is connected.\n");
  }
};

export default establishMongoConnection;
