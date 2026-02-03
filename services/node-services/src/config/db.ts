import mongoose from "mongoose";


const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // crash app if DB fails
  }
};

export default connectMongo;
