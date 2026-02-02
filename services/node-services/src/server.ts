import express from 'express'
import dotenv from 'dotenv'
import { authenticate, AuthRequest} from './middleware/auth'




dotenv.config()

const app = express()


app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});


app.get("/api/products", authenticate, (req: AuthRequest, res) => {
  res.json({
    message: "Protected products list",
    user: req.user,
  });
});


const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();