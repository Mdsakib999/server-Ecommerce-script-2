import { IOrder } from "./order.interface";
export declare const orderService: {
    createOrder: (data: Partial<IOrder>) => Promise<(import("mongoose").Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getAllOrders: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    getMyOrder: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateOrderStatus: (id: string, data: Partial<IOrder>) => Promise<(import("mongoose").Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deleteOrder: (orderId: string) => Promise<(import("mongoose").Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    trackOrder: (trackingId: string) => Promise<(import("mongoose").FlattenMaps<{
        _id?: import("mongoose").Types.ObjectId;
        transactionId: string;
        user: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        mobileNumber: string;
        district: string;
        streetAddress: string;
        total: number;
        paymentMethod: "COD" | "CARD";
        orders: {
            product: import("mongoose").Types.ObjectId;
            quantity: number;
            price: number;
            totalPrice: number;
        }[];
        status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "SHIPPED" | "DELIVERED";
        createdAt?: Date;
        updatedAt?: Date;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=order.service.d.ts.map