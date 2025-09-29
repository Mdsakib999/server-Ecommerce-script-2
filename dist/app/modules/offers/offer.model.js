"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
}, { timestamps: true });
const Offer = (0, mongoose_1.model)("Offer", offerSchema);
exports.default = Offer;
//# sourceMappingURL=offer.model.js.map