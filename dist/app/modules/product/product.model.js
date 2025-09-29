"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    quantity: { type: Number, required: true, default: 1 },
    images: { type: [String], required: true },
    inStock: { type: Boolean, default: true },
    description: { type: String, required: true },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map