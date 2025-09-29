import crypto from "crypto";
import Order from "../modules/order/order.model";

export const generateUniqueTransactionId = async () => {
  let id;
  let exists = true;

  while (exists) {
    id = crypto.randomBytes(6).toString("hex");
    exists = !!(await Order.exists({ transactionId: id }));
  }

  return `TID_${id}`;
};
