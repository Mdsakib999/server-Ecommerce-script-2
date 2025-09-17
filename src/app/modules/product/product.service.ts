import { Request } from "express";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IProduct } from "./product.interface";
import Product from "./product.model";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const createProduct = async (req: Request, data: Partial<IProduct>) => {
  if (req.files && Array.isArray(req.files)) {
    const files = req.files as Express.Multer.File[];

    const results = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "products"))
    );

    data.images = results.map((r) => r.url);
  }

  return await Product.create(data);
};

const getAllProducts = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Product.find(), query);
  const productSearchableFields = ["name", "brand", "category"];

  const productData = queryBuilder
    .filter()
    .search(productSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    productData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getProductById = async (id: string) => {
  return await Product.findById(id).populate("reviews");
};

const updateProduct = async (
  req: Request,
  id: string,
  data: Partial<IProduct>
) => {
  if (req.files && Array.isArray(req.files)) {
    const files = req.files as Express.Multer.File[];

    const results = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "products"))
    );

    data.images = results.map((r) => r.url);
  }

  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
