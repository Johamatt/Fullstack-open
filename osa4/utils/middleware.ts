import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserT } from "../models/user";
const logger = require("./logger");

interface TokenRequest extends Request {
  token?: string;
  user: UserT;
}

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (
  request: TokenRequest,
  response: Response,
  next: NextFunction
) => {
  if (request.method === "GET" || request.path === "/api/login") {
    return next();
  }
  const authHeader = request.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Invalid Authorization header" });
  }
  const token = authHeader.split("Bearer ")[1];
  try {
    jwt.verify(token, process.env.SECRET!) as any;
    request.token = token;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return response.status(401).json({ error: error || "Invalid token" });
  }
};

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
