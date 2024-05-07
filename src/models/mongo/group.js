import { Schema, model } from "mongoose";
const groupSchema = new Schema({
    title: String,
    img: String,
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
export const GroupMongoose = model("Group", groupSchema);
