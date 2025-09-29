"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { _id: false, timestamps: false });
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    transactionId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    district: { type: String, required: true },
    streetAddress: { type: String, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "CARD"], default: "COD" },
    orders: [orderItemSchema],
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "CANCELLED", "SHIPPED", "DELIVERED"],
        default: "PENDING",
    },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map