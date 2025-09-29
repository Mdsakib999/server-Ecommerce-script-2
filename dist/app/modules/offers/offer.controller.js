"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOffer = exports.deleteOffer = exports.getAllOffers = exports.addOffer = void 0;
const uploadToCloudinary_1 = require("../../utils/uploadToCloudinary");
const offer_model_1 = __importDefault(require("./offer.model"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const addOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        if (files.length > 4) {
            return res.status(400).json({ message: "Maximum 4 images allowed" });
        }
        const uploadedImages = yield Promise.all(files.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "offers")));
        const offer = yield offer_model_1.default.create({ images: uploadedImages });
        res.status(201).json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add offer", error });
    }
});
exports.addOffer = addOffer;
// Get all offers
const getAllOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield offer_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: offers });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch offers", error });
    }
});
exports.getAllOffers = getAllOffers;
// Delete offer
const deleteOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield offer_model_1.default.findById(req.params.id);
        if (!offer)
            return res.status(404).json({ message: "Offer not found" });
        for (const img of offer.images) {
            yield cloudinary_1.default.uploader.destroy(img.public_id);
        }
        yield offer_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Offer deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete offer", error });
    }
});
exports.deleteOffer = deleteOffer;
// Update offer (add/remove images)
const updateOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keepPublicIds = req.body.keepPublicIds
            ? JSON.parse(req.body.keepPublicIds)
            : [];
        const files = req.files;
        const offer = yield offer_model_1.default.findById(req.params.id);
        if (!offer)
            return res.status(404).json({ message: "Offer not found" });
        // Delete removed images
        const updatedImages = offer.images.filter((img) => keepPublicIds.includes(img.public_id));
        const deletedImages = offer.images.filter((img) => !keepPublicIds.includes(img.public_id));
        for (const img of deletedImages) {
            yield cloudinary_1.default.uploader.destroy(img.public_id);
        }
        // Upload new images
        const newUploads = files
            ? yield Promise.all(files.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "offers")))
            : [];
        const finalImages = [...updatedImages, ...newUploads];
        if (finalImages.length > 4) {
            return res.status(400).json({ message: "Max 4 images allowed" });
        }
        offer.images = finalImages;
        yield offer.save();
        res.status(200).json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update offer", error });
    }
});
exports.updateOffer = updateOffer;
//# sourceMappingURL=offer.controller.js.map