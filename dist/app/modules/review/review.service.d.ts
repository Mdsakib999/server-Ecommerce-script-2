import { IReview } from "./review.interface";
export declare const createReview: (data: Partial<IReview>) => Promise<import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getReviewsByProduct: (productId: string) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const deleteReview: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
//# sourceMappingURL=review.service.d.ts.map