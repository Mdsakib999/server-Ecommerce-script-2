import Review from "./review.model";
import Product from "../product/product.model";
import { IReview } from "./review.interface";

export const createReview = async (data: Partial<IReview>) => {
  const review = await Review.create(data);

  await Product.findByIdAndUpdate(review.product, {
    $push: { reviews: review._id },
  });

  return review;
};

export const getReviewsByProduct = async (productId: string) => {
  return await Review.find({ product: productId }).populate(
    "user",
    "name email"
  );
};

export const deleteReview = async (id: string) => {
  const review = await Review.findById(id);
  if (!review) return null;

  // remove review reference from product
  await Product.findByIdAndUpdate(review.product, {
    $pull: { reviews: review._id },
  });

  return await Review.findByIdAndDelete(id);
};
