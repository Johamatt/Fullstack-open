import mongoose, { ObjectId, Schema } from "mongoose";
import { BlogT } from "./blog";
const uniqueValidator = require("mongoose-unique-validator");

export type UserT = {
  [x: string]: any;
  _id?: ObjectId | string;
  username: string;
  name?: string;
  passwordHash: string;
  blogs?: BlogT["_id"][];
};

const userSchema = new Schema<UserT>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
