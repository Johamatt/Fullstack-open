import mongoose, { ObjectId, Schema, model } from "mongoose";
import { UserT } from "./user";

export type BlogT = {
  [x: string]: any;
  _id?: ObjectId | string;
  title: string;
  author?: string;
  url: string;
  likes: number;
  user: UserT["_id"];
};

const blogSchema = new Schema<BlogT>({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (doc: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export const BlogModel = model<BlogT>("Blog", blogSchema);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
