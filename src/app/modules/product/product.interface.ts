import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  images: string[];
  reviews?: Types.ObjectId[];
  inStock: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
