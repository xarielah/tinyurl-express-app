import { model, ObjectId, Schema } from "mongoose";

export interface IShortenLink {
  originalUrl: string;
  shortId: string;
  owner: ObjectId | string;
}

const shortListSchema = new Schema<IShortenLink>({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const ShortenLink = model<IShortenLink>("ShortLink", shortListSchema);
