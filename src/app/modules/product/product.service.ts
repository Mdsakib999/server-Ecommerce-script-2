import { QueryBuilder } from "../../utils/QueryBuilder";
import { IProduct } from "./product.interface";
import Product from "./product.model";

export const createProduct = async (data: Partial<IProduct>) => {
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

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
