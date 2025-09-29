/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query || "";
    const allOrders = await orderService.getAllOrders(
      query as Record<string, string>
    );

    res.status(200).json({
      success: true,
      data: allOrders,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getMyOrder = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getMyOrder(req.params.id as string);

    if (!orders) return res.status(404).json({ error: "No order found" });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id as string,
      req.body
    );

    if (!order) return res.status(404).json({ error: "order not found" });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.deleteOrder(req.params.id as string);

    if (!order) return res.status(404).json({ error: "order not found" });

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const trackOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.trackOrder(
      req.params.transactionId as string
    );

    if (!order) return res.status(404).json({ error: "order not found" });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
  getMyOrder,
  updateOrderStatus,
  deleteOrder,
  trackOrder,
};
