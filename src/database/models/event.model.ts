import { HydratedDocument, model, ObjectId, Schema } from "mongoose";

export type EventDocument = HydratedDocument<ILinkEvent>;

export interface ILinkEvent {
  shortLinkId: ObjectId | string;
  referer: string;
  visitorCountry?: string;
  visitorCountryRegion?: string;
  visitorLatitude?: number;
  visitorLongitude?: number;
  visitorFlag?: string;
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
  visitorCountry: {
    type: String,
  },
  visitorCountryRegion: {
    type: String,
  },
  visitorLatitude: {
    type: Number,
  },
  visitorLongitude: {
    type: Number,
  },
  visitorFlag: {
    type: String,
  },
  eventTimeStamp: {
    type: Number,
    required: true,
  },
});

export const eventModel = model<ILinkEvent>("Event", eventSchema);
