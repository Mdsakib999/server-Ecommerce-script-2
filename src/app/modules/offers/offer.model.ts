import { Schema, model } from "mongoose";
import { IOffer } from "./offer.interface";

const offerSchema = new Schema<IOffer>(
  {
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: true }
);

const Offer = model<IOffer>("Offer", offerSchema);

export default Offer;
