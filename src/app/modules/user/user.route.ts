import { Router } from "express";
import { UserControllers } from "../user/user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { handleUpload } from "../../config/multer";

const router = Router();

router.post("/register", UserControllers.createUser);
router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);
router.get("/:id", checkAuth(Role.ADMIN), UserControllers.getSingleUser);
router.put(
  "/:id",
  checkAuth(...Object.values(Role)),
  handleUpload("single", "image"),
  UserControllers.updateUser
);

export const userRoutes = router;
