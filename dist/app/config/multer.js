"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed!"));
    }
};
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB
exports.upload = (0, multer_1.default)({ storage, fileFilter, limits });
const handleUpload = (type, fieldName, maxCount) => {
    return (req, res, next) => {
        const uploader = type === "single"
            ? exports.upload.single(fieldName)
            : exports.upload.array(fieldName, maxCount);
        uploader(req, res, (err) => {
            if (err) {
                if (err instanceof multer_1.default.MulterError &&
                    err.code === "LIMIT_FILE_SIZE") {
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
exports.handleUpload = handleUpload;
//# sourceMappingURL=multer.js.map