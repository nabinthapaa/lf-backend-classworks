import { NextFunction, Response } from "express";
import { BadRequestError } from "../error/BadRequestErrror";
import { Request } from "../interface/auth";
import { Schema } from "joi";

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      next(new BadRequestError(error.message));
    }
    req.query = value;
    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      next(new BadRequestError(error.message));
    }
    req.body = value;
    next();
  };
}
