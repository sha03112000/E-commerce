import express from 'express'
import dotenv from 'dotenv'
import connectMongo from "./config/db";
import productRoutes from './routes/ProductRoutes'




dotenv.config()

const app = express()


app.use("/api/products", productRoutes); // Product routes



const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
  await connectMongo();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();