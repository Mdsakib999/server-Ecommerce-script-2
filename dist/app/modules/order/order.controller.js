"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_service_1.orderService.createOrder(req.body);
        res.status(201).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query || "";
        const allOrders = yield order_service_1.orderService.getAllOrders(query);
        res.status(200).json({
            success: true,
            data: allOrders,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const getMyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.orderService.getMyOrder(req.params.id);
        if (!orders)
            return res.status(404).json({ error: "No order found" });
        res.status(200).json({
            success: true,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_service_1.orderService.updateOrderStatus(req.params.id, req.body);
        if (!order)
            return res.status(404).json({ error: "order not found" });
        res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_service_1.orderService.deleteOrder(req.params.id);
        if (!order)
            return res.status(404).json({ error: "order not found" });
        res.status(200).json({
            success: true,
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const trackOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_service_1.orderService.trackOrder(req.params.transactionId);
        if (!order)
            return res.status(404).json({ error: "order not found" });
        res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
    getMyOrder,
    updateOrderStatus,
    deleteOrder,
    trackOrder,
};
//# sourceMappingURL=order.controller.js.map