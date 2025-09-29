import { Request, Response } from "express";
export declare const productController: {
    createProduct: (req: Request, res: Response) => Promise<void>;
    getAllProducts: (req: Request, res: Response) => Promise<void>;
    getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=product.controller.d.ts.map