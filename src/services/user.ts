import User from '../interface/user'
import * as UserModel from "../models/user";

export function getUserById(id: string){
  const data = UserModel.getUserById(id);

  if(!data){
    return {
      error: `User with id: ${id} not found`
    };
  };

  return data
};

export function createUser(user: User ){
  UserModel.createUser(user);

  return{
    message: "Useer created",
  };
}
