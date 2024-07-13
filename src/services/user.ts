import { GetUserQuery, User } from "../interface/user";
import bcrypt from "bcrypt";
import * as UserModel from "../models/user";
import { BadRequestError } from "../error/BadRequestErrror";

export function add(a: number, b: number) {
  return a + b;
}

export function getUserById(id: string) {
  const data = UserModel.getUserById(id);

  if (!data) {
    throw new BadRequestError(`User with ${id} not found`);
  }

  return data;
}

export async function createUser(user: User) {
  const password = await bcrypt.hash(user.password, 10);
  UserModel.createUser({
    ...user,
    password,
  });

  return {
    message: "User created",
  };
}

export function getUsers(query: GetUserQuery) {
  const data = UserModel.getUsers(query);
  return {
    message: "user found",
    data,
  };
}

export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);

  return data;
}
