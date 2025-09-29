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
exports.categoryController = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const existing = yield category_model_1.default.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
        }).lean();
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists.",
            });
        }
        const newCategory = yield category_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: newCategory,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield category_model_1.default.find().lean().sort("-createdAt");
        res.status(200).json({
            success: true,
            data: allCategories,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCategory = yield category_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
            success: true,
            data: updatedCategory,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteCategory = yield category_model_1.default.findOneAndDelete({
            _id: req.params.id,
        });
        if (!deleteCategory) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
            success: true,
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.categoryController = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map