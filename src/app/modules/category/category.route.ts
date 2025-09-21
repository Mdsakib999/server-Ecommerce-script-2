import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { categoryController } from "./category.controller";

const router = Router();

router.post(
  "/add-category",
  checkAuth(Role.ADMIN),
  categoryController.createCategory
);

router.get("/all-categories", categoryController.getAllCategories);
router.put("/:id", checkAuth(Role.ADMIN), categoryController.updateCategory);
router.delete("/:id", checkAuth(Role.ADMIN), categoryController.deleteCategory);

export const categoryRoutes = router;
