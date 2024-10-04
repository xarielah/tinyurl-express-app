import { HydratedDocument, model, ObjectId, Schema } from "mongoose";

export type EventDocument = HydratedDocument<ILinkEvent>;

export interface ILinkEvent {
  shortLinkId: ObjectId | string;
  referer: string;
  visitorIp: string;
  visitorLocation: string;
  eventTimeStamp: number;
}

const eventSchema = new Schema<ILinkEvent>({
  shortLinkId: {
    type: Schema.Types.ObjectId,
    ref: "ShortLink",
  },
  referer: {
    type: String,
    required: false,
  },
  visitorIp: {
    type: String,
    required: false,
  },
  visitorLocation: {
    type: String,
  },
  eventTimeStamp: {
    type: Number,
    required: true,
  },
});

export const eventModel = model<ILinkEvent>("Event", eventSchema);
