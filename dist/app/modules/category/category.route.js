"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post("/add-category", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), category_controller_1.categoryController.createCategory);
router.get("/all-categories", category_controller_1.categoryController.getAllCategories);
router.put("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), category_controller_1.categoryController.updateCategory);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), category_controller_1.categoryController.deleteCategory);
exports.categoryRoutes = router;
//# sourceMappingURL=category.route.js.map