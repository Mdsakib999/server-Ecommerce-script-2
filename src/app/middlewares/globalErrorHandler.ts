/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVariables } from "../config/envConfig";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something Went Wrong!!";

  res.status(statusCode).json({
    success: false,
    message,
    err: envVariables.NODE_ENV === "development" ? err : null,
    stack: envVariables.NODE_ENV === "development" ? err.stack : null,
  });
};
