/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import * as reviewService from "./review.service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getReviewsByProduct(
      req.params.productId as string
    );
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewService.deleteReview(req.params.id as string);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
