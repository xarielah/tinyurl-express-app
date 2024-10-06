import bcrypt from "bcrypt";
import { IUser } from "../../database/models/user.model";
import * as userRepository from "../../repositories/user.repository";
import * as jwtService from "../auth/jwt.service";

export interface ILoginUser {
  username: string;
  password: string;
}

export interface ITokenResult {
  access_token: string;
  refresh_token: string;
}

export async function loginUser({
  username,
  password,
}: ILoginUser): Promise<ITokenResult | null | false> {
  const user = await userRepository.getUserByUsername(username);
  if (!user) return null;
  if (await bcrypt.compare(password, user.password)) {
    const tokens = {
      access_token: jwtService.generateAccessToken({
        userId: user.id,
      }),
      refresh_token: jwtService.generateRefreshToken({
        userId: user.id,
      }),
    };
    return tokens;
  }
  return false;
}

export async function registerUser({
  username,
  email,
  password,
}: IUser): Promise<ITokenResult | null> {
  const user = await userRepository.getByUsernameOrEmail(username, email);
  if (user) return null;
  const newUser = await userRepository.createUser({
    username,
    email,
    password: await _hashPassword(password),
  });
  return {
    access_token: jwtService.generateAccessToken({
      userId: newUser._id.toString(),
    }),
    refresh_token: jwtService.generateRefreshToken({
      userId: newUser._id.toString(),
    }),
  };
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

export function refreshToken(token: string) {
  if (!token) return null;
  if (jwtService.isValidJwt(token)) {
    const payload: any = jwtService.decode(token);
    return jwtService.generateAccessToken({ userId: payload.userId });
  }
}
