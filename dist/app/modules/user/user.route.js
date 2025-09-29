"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../user/user.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const multer_1 = require("../../config/multer");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.UserControllers.createUser);
router.get("/all-users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getAllUsers);
router.get("/me", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), user_controller_1.UserControllers.getMe);
router.get("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getSingleUser);
router.put("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, multer_1.handleUpload)("single", "image"), user_controller_1.UserControllers.updateUser);
exports.userRoutes = router;
//# sourceMappingURL=user.route.js.map