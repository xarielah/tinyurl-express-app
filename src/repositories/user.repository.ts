import { IUser, User } from "../database/models/user.model";

export function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId).exec();
}

export function createUser(user: IUser): Promise<IUser> {
  return User.create(user);
}

export function getUserByUsername(username: string): Promise<IUser | null> {
  return User.findOne({ username: new RegExp(username, "i") }).exec();
}

export function getUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email: new RegExp(email, "i") }).exec();
}

export function getByUsernameOrEmail(
  username: string,
  email: string
): Promise<IUser | null> {
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
): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, { password: hash }).exec();
}
