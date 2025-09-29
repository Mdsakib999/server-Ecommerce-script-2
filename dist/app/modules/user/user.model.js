"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const AuthProviderSchema = new mongoose_1.Schema({
    provider: {
        type: String,
        enum: ["google", "credentials"],
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
    },
    phone: {
        type: String,
    },
    picture: {
        type: String,
    },
    address: {
        type: String,
    },
    auths: {
        type: [AuthProviderSchema],
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.CUSTOMER,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map