import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { orderController } from "./order.controller";

const router = Router();

router.post("/create-order", orderController.createOrder);
router.get("/all-orders", checkAuth(Role.ADMIN), orderController.getAllOrders);
router.get("/track/:transactionId", orderController.trackOrder);
router.get("/:id", checkAuth(Role.CUSTOMER), orderController.getMyOrder);
router.put("/:id", checkAuth(Role.ADMIN), orderController.updateOrderStatus);
router.delete("/:id", checkAuth(Role.ADMIN), orderController.deleteOrder);

export const orderRoutes = router;
