import { MONGODB_URI } from "./utils/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import loginRouter from "./controllers/login";
require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const app = express();
const { userExtractor } = require("./utils/middleware");

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
app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
