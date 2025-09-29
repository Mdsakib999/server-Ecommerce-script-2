/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req, req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query || "";
    const products = await productService.getAllProducts(
      query as Record<string, string>
    );

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      req.params.id as string
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(
      req,
      req.params.id as string,
      req.body
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.params.id as string);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
