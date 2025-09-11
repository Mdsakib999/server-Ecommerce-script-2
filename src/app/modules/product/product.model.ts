import { Schema } from "mongoose";
import { IProduct } from "./product.interface";
import { model } from "mongoose";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    quantity: { type: Number, required: true, default: 1 },
    images: { type: [String], required: true },
    inStock: { type: Boolean, default: true },
    description: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
