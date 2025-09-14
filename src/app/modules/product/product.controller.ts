/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import * as productService from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req, req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const products = await productService.getAllProducts(
      query as Record<string, string>
    );
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(
      req,
      req.params.id as string,
      req.body
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.params.id as string);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
