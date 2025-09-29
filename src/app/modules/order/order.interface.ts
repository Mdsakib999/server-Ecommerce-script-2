import { Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface IOrder {
  _id?: Types.ObjectId;
  transactionId: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  mobileNumber: string;
  district: string;
  streetAddress: string;
  total: number;
  paymentMethod: "COD" | "CARD";
  orders: IOrderItem[];
  status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "SHIPPED" | "DELIVERED";
  createdAt?: Date;
  updatedAt?: Date;
}
