/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import Category from "./category.model";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existing = await Category.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    }).lean();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    const newCategory = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await Category.find().lean().sort("-createdAt");
    res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleteCategory = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deleteCategory) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const categoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
