import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  category: z.string().min(2, "Category must be at least 2 characters long"),
  images: z.array(z.string()).optional(),
}) .strict();

// For updates, all fields are optional
export const updateProductSchema = createProductSchema.partial();