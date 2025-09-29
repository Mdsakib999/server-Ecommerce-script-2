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
exports.productService = void 0;
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const product_model_1 = __importDefault(require("./product.model"));
const uploadToCloudinary_1 = require("../../utils/uploadToCloudinary");
const createProduct = (req, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files && Array.isArray(req.files)) {
        const files = req.files;
        const results = yield Promise.all(files.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "products")));
        data.images = results.map((r) => r.url);
    }
    return yield product_model_1.default.create(data);
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(product_model_1.default.find(), query);
    const productSearchableFields = ["name", "brand", "category"];
    const productData = queryBuilder
        .filter()
        .search(productSearchableFields)
        .sort()
        .fields()
        .paginate();
    const fieldsRaw = query["fields[]"];
    let categories = [];
    if (fieldsRaw) {
        if (Array.isArray(fieldsRaw)) {
            categories = fieldsRaw;
        }
        else if (typeof fieldsRaw === "string") {
            categories = [fieldsRaw];
        }
    }
    if (categories.length > 0) {
        queryBuilder.modelQuery = queryBuilder.modelQuery.find({
            category: { $in: categories },
        });
    }
    const [data, meta] = yield Promise.all([
        productData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findById(id).lean();
});
const updateProduct = (req, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files && Array.isArray(req.files)) {
        const files = req.files;
        const results = yield Promise.all(files.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "products")));
        data.images = results.map((r) => r.url);
    }
    return yield product_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndDelete(id);
});
exports.productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.service.js.map