import { NextFunction, Request, Response } from "express";
import multer from "multer";
export declare const upload: multer.Multer;
export declare const handleUpload: (type: "single" | "array", fieldName: string, maxCount?: number) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=multer.d.ts.map