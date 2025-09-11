import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";

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
    element: userRoutes,
  },
  {
    path: "/review",
    element: userRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.element);
});
