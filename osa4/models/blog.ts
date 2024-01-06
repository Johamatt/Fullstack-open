import { ObjectId } from "mongoose";

const mongoose = require("mongoose");

export type BlogT = {
  id: ObjectId | string;
  title: string;
  author: string;
  url: string;
  likes: number;
  _id?: any;
  __v?: number;
};

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
  }
  // {
  //   collection: "Blog",
  //   versionKey: false,
  // }
);

blogSchema.set("toJSON", {
  transform: (returnedObject: BlogT) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
