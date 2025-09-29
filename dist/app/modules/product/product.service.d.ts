import { Request } from "express";
import { IProduct } from "./product.interface";
export declare const productService: {
    createProduct: (req: Request, data: Partial<IProduct>) => Promise<import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllProducts: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getProductById: (id: string) => Promise<(import("mongoose").FlattenMaps<IProduct> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
    updateProduct: (req: Request, id: string, data: Partial<IProduct>) => Promise<(import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteProduct: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=product.service.d.ts.map