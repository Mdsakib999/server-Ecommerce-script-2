"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const offer_controller_1 = require("./offer.controller");
const multer_1 = require("../../config/multer");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post("/add-offer", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, multer_1.handleUpload)("array", "images", 4), offer_controller_1.addOffer);
router.get("/all-offers", offer_controller_1.getAllOffers);
router.put("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, multer_1.handleUpload)("array", "images", 4), offer_controller_1.updateOffer);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), offer_controller_1.deleteOffer);
exports.offerRoutes = router;
//# sourceMappingURL=offer.route.js.map