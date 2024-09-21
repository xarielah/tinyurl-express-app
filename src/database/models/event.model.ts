import { model, ObjectId, Schema } from "mongoose";

export interface ILinkEvent {
  shortLinkId: ObjectId | string;
  referer: string;
  visitorIp: string;
  visitorLocation: string;
  eventTimeStamp: Date;
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
    required: true,
  },
  eventTimeStamp: {
    type: Date,
    default: new Date(),
  },
});

export const eventModel = model<ILinkEvent>("Event", eventSchema);
