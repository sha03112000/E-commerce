import express from 'express'
import dotenv from 'dotenv'
import connectMongo from "./config/db";
import productRoutes from './routes/ProductRoutes'
import { globalErrorHandler } from "./middleware/errorHandler";




dotenv.config()

const app = express()
app.use(express.json());


app.use("/api/products", productRoutes); // Product routes


// Global Error Handler (MUST BE LAST)
app.use(globalErrorHandler);

const PORT = Number(process.env.PORT) || 4000;

console.log("🔥 server reloaded");

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
};

startServer();