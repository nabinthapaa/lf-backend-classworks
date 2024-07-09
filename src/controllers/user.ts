import { Request, Response } from "express";
import * as UserService from "../services/user";
import { GetUserQuery } from "../interface/user";

export function getUsers(
  req: Request<any, any, any, GetUserQuery>,
  res: Response,
) {
  const { query } = req;

  const data = UserService.getUsers(query);

  res.json(data);
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.getUserById(id);

  res.json(data);
}

export async function createUser(req: Request, res: Response) {
  const { body } = req;
  const data = await UserService.createUser(body);

  res.json({ data });
}
