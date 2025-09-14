import { Router } from "express";
import * as productController from "./product.controller";
import { upload } from "../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/add-product",
  upload.array("images", 4),
  checkAuth(Role.ADMIN),
  productController.createProduct
);
router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", checkAuth(Role.ADMIN), productController.updateProduct);
router.delete("/:id", checkAuth(Role.ADMIN), productController.deleteProduct);

export const productRoutes = router;
