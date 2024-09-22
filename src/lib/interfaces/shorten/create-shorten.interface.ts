import { ObjectId } from "mongoose";

export interface ICreateShorten {
  url: string;
  ownerId: string | ObjectId;
  shortId: string;
}
