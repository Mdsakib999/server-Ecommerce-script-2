import { Router } from "express";
import { upload } from "../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { productController } from "./product.controller";

const router = Router();

router.post(
  "/add-product",
  upload.array("images", 4),
  checkAuth(Role.ADMIN),
  productController.createProduct
);

router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  checkAuth(Role.ADMIN),
  upload.array("images", 4),
  productController.updateProduct
);
router.delete("/:id", checkAuth(Role.ADMIN), productController.deleteProduct);

export const productRoutes = router;
