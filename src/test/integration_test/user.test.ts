import request from "supertest";
import express from "express";
import router from "../../routes";
import expect from "expect";
import { users } from "../../models/user";

describe("User Integration test", () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  describe("CreateUser API test", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Bijen",
        email: "Bijen@gmail.com",
        password: "Test1234@1234",
        id: "2",
        permissions: ["users.get"],
      });

    console.log(users);
  });
});
