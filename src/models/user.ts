import { GetUserQuery, User } from "../interface/user";

export const users: User[] = [
  {
    name: "Bijen",
    email: "Bijen@gmail.com",
    password: "$2b$10$/.Fh4GGQrIZsZTBtTctgne6Hz9HkHX9NVPrW5fDU/6YbT8A7kP9PC",
    id: "1",
    permissions: ["users.get"],
  },
];

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
  });
}

export function getUsers(query: GetUserQuery) {
  const { q } = query;

  if (q) {
    return users.filter(({ name }) => name === q);
  }
  return users;
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}
