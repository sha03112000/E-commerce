import express from 'express'
import dotenv from 'dotenv'




dotenv.config()

const app = express()


app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();