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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.productService.createProduct(req, req.body);
        res.status(201).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query || "";
        const products = yield product_service_1.productService.getAllProducts(query);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.productService.getProductById(req.params.id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.productService.updateProduct(req, req.params.id, req.body);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.status(200).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.productService.deleteProduct(req.params.id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map