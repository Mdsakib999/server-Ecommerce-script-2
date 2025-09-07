import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExists = await User.findOne({ email }).lean();

  if (isUserExists) {
    throw new Error("User Already Exists");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(process.env.BCRYPT_SALT_ROUNDS)
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

  const { password: exceptPassword, ...remaining } = user.toObject();

  return remaining;
};

export const UserService = {
  createUserService,
};
