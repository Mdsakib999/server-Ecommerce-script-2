import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { productRoutes } from "../modules/product/product.route";
import { categoryRoutes } from "../modules/category/category.route";
import { orderRoutes } from "../modules/order/order.route";
import { offerRoutes } from "../modules/offers/offer.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/user",
    element: userRoutes,
  },
  {
    path: "/product",
    element: productRoutes,
  },
  {
    path: "/category",
    element: categoryRoutes,
  },
  {
    path: "/order",
    element: orderRoutes,
  },
  {
    path: "/offer",
    element: offerRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.element);
});
