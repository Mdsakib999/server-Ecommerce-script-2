import { Request } from "express";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IProduct } from "./product.interface";
import Product from "./product.model";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export const createProduct = async (req: Request, data: Partial<IProduct>) => {
  if (req.files && Array.isArray(req.files)) {
    const files = req.files as Express.Multer.File[];

    const results = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "products"))
    );

    data.images = results.map((r) => r.url);
  }

  return await Product.create(data);
};

export const getAllProducts = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Product.find().populate("reviews"),
    query
  );
  const productSearchableFields = ["name", "brand", "description"];

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

export const getProductById = async (id: string) => {
  return await Product.findById(id).populate("reviews");
};

export const updateProduct = async (
  req: Request,
  id: string,
  data: Partial<IProduct>
) => {
  if (req.files && Array.isArray(req.files)) {
    const files = req.files as Express.Multer.File[];

    // Upload new images
    const results = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "products"))
    );

    // Replace or merge old images
    data.images = results.map((r) => r.url);
  }

  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
