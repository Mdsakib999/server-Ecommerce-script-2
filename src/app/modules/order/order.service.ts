import { QueryBuilder } from "../../utils/QueryBuilder";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import { User } from "../user/user.model";
import { generateUniqueTransactionId } from "../../utils/generateTransactionId";

const createOrder = async (data: Partial<IOrder>) => {
  const transactionId = await generateUniqueTransactionId();

  const result = await Order.create({ ...data, transactionId });

  await User.findByIdAndUpdate(data.user, { $push: { orders: result._id } });

  const populatedOrder = await Order.findById(result?._id).populate({
    path: "orders.product",
    select: "name images discountPrice price",
  });

  return populatedOrder;
};

const getAllOrders = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Order.find().populate("orders.product"),
    query
  );

  const orderData = queryBuilder.filter().search([]).sort().fields().paginate();

  const [data, meta] = await Promise.all([
    orderData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getMyOrder = async (userId: string) => {
  return await Order.find({ user: userId }).populate("orders.product");
};

const updateOrderStatus = async (id: string, data: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  await User.findByIdAndUpdate(order.user, {
    $pull: { orders: orderId },
  });

  return await Order.findByIdAndDelete(orderId);
};

const trackOrder = async (trackingId: string) => {
  return await Order.findOne({ transactionId: trackingId }).lean();
};

export const orderService = {
  createOrder,
  getAllOrders,
  getMyOrder,
  updateOrderStatus,
  deleteOrder,
  trackOrder,
};
