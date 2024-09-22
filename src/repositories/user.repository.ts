import { IUser, User, UserDocument } from "../database/models/user.model";
import { ICreateUser } from "../lib/interfaces/auth/create-user.interface";

export function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId).exec();
}

export function createUser(user: ICreateUser): Promise<IUser> {
  return User.create(user);
}

export function getUserByUsername(
  username: string
): Promise<UserDocument | null> {
  return User.findOne({ username: new RegExp(username, "i") }).exec();
}

export function getUserByEmail(email: string): Promise<UserDocument | null> {
  return User.findOne({ email: new RegExp(email, "i") }).exec();
}

export function updateUserAccessToken(
  userId: string,
  token: string
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, { access_token: token }).exec();
}

export function updateUserRefreshToken(
  userId: string,
  token: string
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, { refresh_token: token }).exec();
}

export function getByUsernameOrEmail(
  username: string,
  email: string
): Promise<UserDocument | null> {
  return User.findOne({
    $or: [
      { username: new RegExp(username, "i") },
      { email: new RegExp(email, "i") },
    ],
  }).exec();
}

export function updateUserPassword(
  userId: string,
  hash: string
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, { password: hash }).exec();
}
