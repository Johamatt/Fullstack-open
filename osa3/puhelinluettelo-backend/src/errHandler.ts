import { NextFunction, Request, RequestHandler, Response } from "express";

export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};