import { Router } from "express";
import * as productController from "./product.controller";

const router = Router();

router.post("/add-product", productController.createProduct);
router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export const productRoutes = router;
