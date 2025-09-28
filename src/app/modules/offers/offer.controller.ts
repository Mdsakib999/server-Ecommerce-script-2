import { Request, Response } from "express";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import Offer from "./offer.model";
import cloudinary from "../../config/cloudinary";

export const addOffer = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (files.length > 4) {
      return res.status(400).json({ message: "Maximum 4 images allowed" });
    }

    const uploadedImages = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "offers"))
    );

    const offer = await Offer.create({ images: uploadedImages });
    res.status(201).json({ success: true, data: offer });
  } catch (error) {
    res.status(500).json({ message: "Failed to add offer", error });
  }
};

// Get all offers
export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch offers", error });
  }
};

// Delete offer
export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    for (const img of offer.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Offer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete offer", error });
  }
};

// Update offer (add/remove images)
export const updateOffer = async (req: Request, res: Response) => {
  try {
    const keepPublicIds = req.body.keepPublicIds
      ? JSON.parse(req.body.keepPublicIds)
      : [];
    const files = req.files as Express.Multer.File[];
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    // Delete removed images
    const updatedImages = offer.images.filter((img) =>
      keepPublicIds.includes(img.public_id)
    );
    const deletedImages = offer.images.filter(
      (img) => !keepPublicIds.includes(img.public_id)
    );
    for (const img of deletedImages) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Upload new images
    const newUploads = files
      ? await Promise.all(
          files.map((file) => uploadToCloudinary(file.buffer, "offers"))
        )
      : [];

    const finalImages = [...updatedImages, ...newUploads];
    if (finalImages.length > 4) {
      return res.status(400).json({ message: "Max 4 images allowed" });
    }

    offer.images = finalImages;
    await offer.save();

    res.status(200).json({ success: true, data: offer });
  } catch (error) {
    res.status(500).json({ message: "Failed to update offer", error });
  }
};
