import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { Request } from "../interface/auth";
import { User } from "../interface/user";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

export function authenticate(req: Request, _: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret!) as Omit<User, "password">;
    req.user = user;
    next();
  } catch (e) {
    next(new UnauthenticatedError("Unauthenticated"));
  }
}

export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    if (!user.permissions.includes(permission)) {
      next(new Error("Forbidden"));
    }

    next();
  };
}
