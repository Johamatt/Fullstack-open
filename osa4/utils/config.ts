import * as dotenv from "dotenv";
dotenv.config();

let PORT = process.env.PORT || "";
let MONGODB_URI = process.env.MONGODB_URI || "";

export { PORT, MONGODB_URI };
