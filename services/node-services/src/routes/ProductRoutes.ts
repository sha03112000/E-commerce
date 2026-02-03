import { Router } from "express";
import {
    createProduct,
    listProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/ProductController";
import { authenticate } from "../middleware/auth";
import { allowRoles } from "../middleware/role";

const router = Router();

// Public
router.get("/", listProducts);
router.get("/:id", getProduct);

// Vendor/Admin
router.post("/", authenticate, allowRoles(["vendor", "admin"]), createProduct);

router.route("/:id")
    .put(authenticate, allowRoles(["vendor", "admin"]), updateProduct)
    .delete(authenticate, allowRoles(["vendor", "admin"]), deleteProduct);


export default router;