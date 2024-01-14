import {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware";
import logger from "./utils/logger";
import { MONGODB_URI } from "./utils/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import loginRouter from "./controllers/login";
import usersRouter from "./controllers/users";
import blogRouter from "./controllers/blogs";

mongoose.set("strictQuery", false);

logger.info("connecting to db");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error: Error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

const app = express();
//@ts-ignore
app.use(tokenExtractor);
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);
//@ts-ignore
app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export { app };
