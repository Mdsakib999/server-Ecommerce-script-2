import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

export const upload = multer({ storage, fileFilter, limits });

export const handleUpload = (
  type: "single" | "array",
  fieldName: string,
  maxCount?: number
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploader =
      type === "single"
        ? upload.single(fieldName)
        : upload.array(fieldName, maxCount);

    uploader(req, res, (err) => {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_FILE_SIZE"
        ) {
          return res
            .status(400)
            .json({ message: "File too large. Max size is 5MB." });
        }
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};
