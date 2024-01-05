import { Schema, Model, Document } from "mongoose";

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result: any) => {
    console.log("connected to MongoDB");
  })
  .catch((error: any) => {
    console.log("error connecting to MongoDB:", error.message);
  });

export interface Person extends Document {
  name: string;
  number: string;
}

export const PersonSchema: Schema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v: any) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props: any) =>
        `${props.value} is not a valid phone number! Separate by a hyphen e.g: 12-123456 or 123-123456`,
    },
    required: [true, "User phone number required"],
  },
});

PersonSchema.set("toJSON", {
  transform: (doc: any, returnedObject: Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const PersonModel: Model<Person> = mongoose.model(
  "Person",
  PersonSchema
);

export { mongoose };
