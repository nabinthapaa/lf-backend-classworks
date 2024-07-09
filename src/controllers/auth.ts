import { Response, Request } from "express";
import * as AuthService from "../services/auth";

export async function login(req: Request, res: Response) {
  const { body } = req;

  const data = await AuthService.login(body);

  res.json(data);
}
