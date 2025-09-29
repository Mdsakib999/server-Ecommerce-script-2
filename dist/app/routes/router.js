"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const product_route_1 = require("../modules/product/product.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const offer_route_1 = require("../modules/offers/offer.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        element: auth_route_1.authRoutes,
    },
    {
        path: "/user",
        element: user_route_1.userRoutes,
    },
    {
        path: "/product",
        element: product_route_1.productRoutes,
    },
    {
        path: "/category",
        element: category_route_1.categoryRoutes,
    },
    {
        path: "/order",
        element: order_route_1.orderRoutes,
    },
    {
        path: "/offer",
        element: offer_route_1.offerRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.element);
});
//# sourceMappingURL=router.js.map