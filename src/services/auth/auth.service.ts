import bcrypt from "bcrypt";
import { IUser } from "../../database/models/user.model";
import * as userRepository from "../../repositories/user.repository";

export interface ILoginUser {
  username: string;
  password: string;
}

export async function loginUser({
  username,
  password,
}: ILoginUser): Promise<IUser | null | boolean> {
  const user = await userRepository.getUserByUsername(username);
  if (!user) return null;
  if (await bcrypt.compare(password, user.password)) return user;
  return false;
}

export async function registerUser({
  username,
  email,
  password,
}: IUser): Promise<IUser | null> {
  const user = await userRepository.getUserByUsername(username);
  if (user) return null;
  return userRepository.createUser({
    username,
    email,
    password: await _hashPassword(password),
  });
}

function _hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function changePassword(
  userId: string,
  password: string
): Promise<IUser | null> {
  return userRepository.updateUserPassword(userId, password);
}
