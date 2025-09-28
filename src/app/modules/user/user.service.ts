import bcrypt from "bcryptjs";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExists = await User.findOne({ email }).lean();

  if (isUserExists) {
    throw new Error("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(envVariables.BCRYPT_SALT_ROUNDS)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: exceptPassword, ...remaining } = user.toObject();

  return remaining;
};

import { Request } from "express";
import { envVariables } from "../../config/envConfig";

const updateUserService = async (
  req: Request,
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role === Role.CUSTOMER) {
    if (userId !== decodedToken.userId) {
      throw new Error("You are not authorized");
    }
  }

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "myFolder");
    payload.picture = result.url;
  }

  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new Error("User Not Found");
  }

  if (payload.role) {
    if (decodedToken.role === Role.CUSTOMER) {
      throw new Error("You are not authorized");
    }
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const getAllUsersService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const userSearchableFields = ["name", "email", "address"];

  const usersData = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return {
    data: user,
  };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("orders");

  return {
    data: user,
  };
};

export const UserService = {
  createUserService,
  getAllUsersService,
  getSingleUser,
  getMe,
  updateUserService,
};
