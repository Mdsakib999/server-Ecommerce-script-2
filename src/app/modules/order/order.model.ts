import { model, Schema } from "mongoose";
import { IOrder, IOrderItem } from "./order.interface";

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { _id: false, timestamps: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
