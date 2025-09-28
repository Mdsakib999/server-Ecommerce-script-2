import express from "express";
import {
  addOffer,
  getAllOffers,
  deleteOffer,
  updateOffer,
} from "./offer.controller";
import { handleUpload } from "../../config/multer";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post(
  "/add-offer",
  checkAuth(Role.ADMIN),
  handleUpload("array", "images", 4),
  addOffer
);

router.get("/all-offers", getAllOffers);

router.put(
  "/:id",
  checkAuth(Role.ADMIN),
  handleUpload("array", "images", 4),
  updateOffer
);

router.delete("/:id", checkAuth(Role.ADMIN), deleteOffer);

export const offerRoutes = router;
