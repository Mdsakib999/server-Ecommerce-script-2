import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "./user.service";

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUserService(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

export const UserControllers = {
  createUser,
};
