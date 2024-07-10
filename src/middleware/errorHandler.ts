import { NextFunction, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { Request } from "../interface/auth";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Error Handler");

export function NotFounnd(_: Request, res: Response) {
  return res.status(HttpStatusCode.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error.message,
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Errror",
  });
}
