import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { productRoutes } from "../modules/product/product.route";

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
    path: "/review",
    element: userRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.element);
});
