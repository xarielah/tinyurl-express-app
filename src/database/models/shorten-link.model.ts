import { HydratedDocument, model, ObjectId, Schema } from "mongoose";

export type ShortenLinkDocument = HydratedDocument<IShortenLink>;

export interface IShortenLink {
  originalUrl: string;
  shortId: string;
  owner: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const shortListSchema = new Schema<IShortenLink>(
  {
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
  },
  { timestamps: true }
);

export const ShortenLink = model<IShortenLink>("ShortLink", shortListSchema);
