/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string
) => {
  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else
          resolve({ url: result!.secure_url, public_id: result!.public_id });
      }
    );
    stream.end(fileBuffer);
  });
};
