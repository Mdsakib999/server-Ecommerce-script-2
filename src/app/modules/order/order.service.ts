import { QueryBuilder } from "../../utils/QueryBuilder";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import { User } from "../user/user.model";
import { generateUniqueTransactionId } from "../../utils/generateTransactionId";
import Product from "../product/product.model";
import { IProduct } from "../product/product.interface";

const createOrder = async (data: Partial<IOrder>) => {
  const productIds = data?.orders?.map((order) => order.product);
  const products = await Product.find({ _id: { $in: productIds } });

  for (const orderItem of data.orders!) {
    const product = products.find(
      (p: Partial<IProduct>) =>
        p._id?.toString() === orderItem.product.toString()
    );
    if (!product) {
      throw new Error("product ot found");
    }
    if (orderItem.quantity > product.quantity) {
      throw new Error(`only ${product.quantity} available`);
    }
  }

  const transactionId = await generateUniqueTransactionId();
  const result = await Order.create({ ...data, transactionId });

  for (const orderItem of data.orders!) {
    await Product.findByIdAndUpdate(orderItem.product, {
      $inc: { quantity: -orderItem.quantity },
    });
  }

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

export const updateOrderStatus = async (id: string, data: Partial<IOrder>) => {
  const { status } = data;

  const order = await Order.findById(id).populate("orders.product");
  if (!order) throw new Error("Order not found");

  if (status === "CANCELLED") {
    for (const item of order.orders) {
      const productDoc = item.product as unknown as IProduct;

      if (productDoc && productDoc.quantity !== undefined) {
        productDoc.quantity += item.quantity;
        await productDoc.save();
      }
    }
  }

  if (status === "CONFIRMED" && order.status === "CANCELLED") {
    for (const item of order.orders) {
      const productDoc = item.product as unknown as IProduct;

      if (productDoc && productDoc.quantity !== undefined) {
        productDoc.quantity -= item.quantity;
        await productDoc.save();
      }
    }
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate({
    path: "orders.product",
    select: "name images discountPrice price quantity",
  });

  return updatedOrder;
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
