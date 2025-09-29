"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
router.post("/create-order", order_controller_1.orderController.createOrder);
router.get("/all-orders", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), order_controller_1.orderController.getAllOrders);
router.get("/track/:transactionId", order_controller_1.orderController.trackOrder);
router.get("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.CUSTOMER), order_controller_1.orderController.getMyOrder);
router.put("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), order_controller_1.orderController.updateOrderStatus);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), order_controller_1.orderController.deleteOrder);
exports.orderRoutes = router;
//# sourceMappingURL=order.route.js.map