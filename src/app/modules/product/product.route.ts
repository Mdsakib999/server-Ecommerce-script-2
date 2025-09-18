import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { productController } from "./product.controller";
import { handleUpload } from "../../config/multer";

const router = Router();

router.post(
  "/add-product",
  handleUpload("array", "images", 4),
  checkAuth(Role.ADMIN),
  productController.createProduct
);

router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  checkAuth(Role.ADMIN),
  handleUpload("array", "images", 4),
  productController.updateProduct
);
router.delete("/:id", checkAuth(Role.ADMIN), productController.deleteProduct);

export const productRoutes = router;
