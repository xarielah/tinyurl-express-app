import { connect } from "mongoose";
import { mongoConfig } from "../config/mongo.config";

// # Register events to be logged.

export async function connectMongoClient() {
  const connection = await connect(mongoConfig.uri);
  console.log("MongoDB connected: ", connection.connection.host);
}
