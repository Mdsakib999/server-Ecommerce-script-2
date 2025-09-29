"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const product_controller_1 = require("./product.controller");
const multer_1 = require("../../config/multer");
const router = (0, express_1.Router)();
router.post("/add-product", (0, multer_1.handleUpload)("array", "images", 4), (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), product_controller_1.productController.createProduct);
router.get("/all-products", product_controller_1.productController.getAllProducts);
router.get("/:id", product_controller_1.productController.getProductById);
router.put("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, multer_1.handleUpload)("array", "images", 4), product_controller_1.productController.updateProduct);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), product_controller_1.productController.deleteProduct);
exports.productRoutes = router;
//# sourceMappingURL=product.route.js.map