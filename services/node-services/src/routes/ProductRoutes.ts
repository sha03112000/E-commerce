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
import { validate } from "../middleware/validate";
import {
    createProductSchema,
    updateProductSchema,
} from "../validators/productValidator";


const router = Router();

// Public
router.get("/", listProducts);
router.get("/:id", getProduct);

// Vendor/Admin
router.post("/", authenticate, allowRoles(["vendor", "admin", "customer"]), validate({
    body: createProductSchema,
}), createProduct);

router.route("/:id")
    .put(authenticate, allowRoles(["vendor", "admin"]), validate({
        body: updateProductSchema,
    }), updateProduct)
    .delete(authenticate, allowRoles(["vendor", "admin"]), deleteProduct);


export default router;