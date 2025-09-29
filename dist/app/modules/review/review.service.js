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
exports.deleteReview = exports.getReviewsByProduct = exports.createReview = void 0;
const review_model_1 = __importDefault(require("./review.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.default.create(data);
    yield product_model_1.default.findByIdAndUpdate(review.product, {
        $push: { reviews: review._id },
    });
    return review;
});
exports.createReview = createReview;
const getReviewsByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.find({ product: productId }).populate("user", "name email");
});
exports.getReviewsByProduct = getReviewsByProduct;
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.default.findById(id);
    if (!review)
        return null;
    // remove review reference from product
    yield product_model_1.default.findByIdAndUpdate(review.product, {
        $pull: { reviews: review._id },
    });
    return yield review_model_1.default.findByIdAndDelete(id);
});
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.service.js.map