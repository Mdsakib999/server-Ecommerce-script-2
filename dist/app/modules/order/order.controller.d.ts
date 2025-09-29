import { Request, Response } from "express";
export declare const orderController: {
    createOrder: (req: Request, res: Response) => Promise<void>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
    getMyOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateOrderStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    trackOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=order.controller.d.ts.map