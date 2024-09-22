import { HydratedDocument, model, Schema } from "mongoose";

export type UserDocument = HydratedDocument<IUser>;

export interface IUser {
  username: string;
  email: string;
  password: string;
  refresh_token: string;
  access_token?: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    default: "",
  },
  access_token: {
    type: String,
    default: "",
  },
});

export const User = model<IUser>("User", userSchema);
