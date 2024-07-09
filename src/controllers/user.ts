import { Request, Response } from "express";
import * as UserService from '../services/user';

export function getUsers(req: Request, res: Response){
  res.json({
    message: "User get"
  })
};

export function getUserById(req: Request, res: Response){
  const { id } = req.params;
  console.log(req.query);
  console.log(req.body);

  const data = UserService.getUserById(id);
  
  res.json(data)
};

export function createUser(req: Request, res: Response){
  const { body } = res;
  console.log(body);

  const data = UserService.createUser(body);

  return data;
}

