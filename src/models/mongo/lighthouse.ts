import { Schema, model } from "mongoose";
import { Lighthouse } from "../../types/donation-types";

const lighthouseSchema = new Schema<Lighthouse>({
  title: String,
  towerHeight: Number,
  lightHeight: Number,
  character: String,
  daymark: String,
  range: Number,
  lat: Number,
  lng: Number,
  
  groupid: {
    type: Schema.Types.ObjectId,
    ref: "group",
  }
  
});

export const LighthouseMongoose = model("Lighthouse", lighthouseSchema);