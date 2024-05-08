import { Schema, model } from "mongoose";
import { Group } from "../../types/donation-types";

const groupSchema = new Schema<Group>({
  title: String,
  img: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const GroupMongoose = model("Group", groupSchema);