/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setCookie";

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUserService(req.body);

    const userTokens = await createUserToken(user);

    setAuthCookie(res, userTokens);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const verifiedToken = req.user;

    const payload = req.body;
    const user = await UserService.updateUserService(
      req,
      userId as string,
      payload,
      verifiedToken as JwtPayload
    );

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await UserService.getAllUsersService(
      query as Record<string, string>
    );

    res.status(200).json({
      success: true,
      message: "All users retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserService.getMe(decodedToken.userId);

    res.status(200).json({
      success: true,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  }
);

const getSingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id as string);

    res.status(200).json({
      success: true,
      message: "User Retrieved Successfully",
      data: result.data,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getMe,
};
