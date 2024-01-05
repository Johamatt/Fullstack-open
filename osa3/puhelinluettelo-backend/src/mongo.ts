import { Schema, Model, Document, connect } from "mongoose";

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI || "";

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error: Error) => {
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
      validator: function (v: string) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number! Separate by a hyphen e.g: 12-123456 or 123-123456`,
    },
    required: [true, "User phone number required"],
  },
});

PersonSchema.set("toJSON", {
  transform: (returnedObject: Record<string, any>) => {
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
