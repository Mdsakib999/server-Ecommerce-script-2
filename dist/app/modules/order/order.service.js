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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const order_model_1 = __importDefault(require("./order.model"));
const user_model_1 = require("../user/user.model");
const generateTransactionId_1 = require("../../utils/generateTransactionId");
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = yield (0, generateTransactionId_1.generateUniqueTransactionId)();
    const result = yield order_model_1.default.create(Object.assign(Object.assign({}, data), { transactionId }));
    yield user_model_1.User.findByIdAndUpdate(data.user, { $push: { orders: result._id } });
    const populatedOrder = yield order_model_1.default.findById(result === null || result === void 0 ? void 0 : result._id).populate({
        path: "orders.product",
        select: "name images discountPrice price",
    });
    return populatedOrder;
});
const getAllOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(order_model_1.default.find().populate("orders.product"), query);
    const orderData = queryBuilder.filter().search([]).sort().fields().paginate();
    const [data, meta] = yield Promise.all([
        orderData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
});
const getMyOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.find({ user: userId }).populate("orders.product");
});
const updateOrderStatus = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(orderId);
    if (!order)
        throw new Error("Order not found");
    yield user_model_1.User.findByIdAndUpdate(order.user, {
        $pull: { orders: orderId },
    });
    return yield order_model_1.default.findByIdAndDelete(orderId);
});
const trackOrder = (trackingId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.findOne({ transactionId: trackingId }).lean();
});
exports.orderService = {
    createOrder,
    getAllOrders,
    getMyOrder,
    updateOrderStatus,
    deleteOrder,
    trackOrder,
};
//# sourceMappingURL=order.service.js.map