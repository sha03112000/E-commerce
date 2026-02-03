import express from 'express'
import dotenv from 'dotenv'
import { authenticate, AuthRequest} from './middleware/auth'
import { allowRoles } from './middleware/role'




dotenv.config()

const app = express()


app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});


// protected route example
app.get("/api/products", authenticate, (req: AuthRequest, res) => {
  res.json({
    message: "Protected products list",
    user: req.user,
  });
});

// role protected route example for admin, vendor, customer
app.get(
  "/api/products",
  authenticate,
  allowRoles(["admin", "vendor", "customer"]),
  (req, res) => {
    res.json({ products: [] });
  }
);


// protected route example for admin only
app.delete(
  "/api/products/:id",
  authenticate,
  allowRoles(["admin"]),
  (req, res) => {
    res.json({ message: "Product deleted" });
  }
);


// protected route example for vendor 
app.post(
  "/api/products",
  authenticate,
  allowRoles(["vendor"]),
  (req, res) => {
    res.json({ message: "Product created" });
  }
);



const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();