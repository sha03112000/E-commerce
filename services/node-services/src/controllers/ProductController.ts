import { Request, Response } from "express";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth";

// CREATE PRODUCT (Vendor/Admin)
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.create({
      ...req.body,
      vendor_id: req.user!.user_id,
    });

    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ message: "Product creation failed" });
  }
};

// LIST PRODUCTS (Public)
export const listProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ is_active: true });
  return res.json(products);
};


// GET SINGLE PRODUCT (Public)
export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
};

// UPDATE PRODUCT (Owner/Admin)
export const updateProduct = async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  if (
    product.vendor_id !== req.user!.user_id &&
    req.user!.role !== "admin"
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(product, req.body);
  await product.save();

  return res.json(product);
};

// DELETE PRODUCT (Owner/Admin)
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  if (
    product.vendor_id !== req.user!.user_id &&
    req.user!.role !== "admin"
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await product.deleteOne();
  return res.json({ message: "Product deleted" });
};
