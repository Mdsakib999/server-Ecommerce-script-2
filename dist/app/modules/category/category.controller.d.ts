import { Request, Response } from "express";
export declare const categoryController: {
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllCategories: (req: Request, res: Response) => Promise<void>;
    updateCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=category.controller.d.ts.map