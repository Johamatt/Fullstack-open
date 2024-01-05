import { Schema, Model, Document } from "mongoose";

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
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
    name: { type: String, required: true },
    number: { type: String, required: false },
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
