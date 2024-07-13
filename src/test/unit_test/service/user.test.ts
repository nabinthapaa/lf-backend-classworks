import expect from "expect";
import Sinon from "sinon";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../../error/BadRequestErrror";
import * as UserModel from "../../../models/user";
import { add, getUserById, createUser } from "../../../services/user";

describe("User Service test Suite", () => {
  describe("add", () => {
    it("Should return the sum of two number", () => {
      const output = add(1, 2);
      expect(output).toBe(3);
    });
  });

  describe("getUserById", () => {
    let userModelGetUserByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByIdStub = Sinon.stub(UserModel, "getUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });
    it("Should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);
      expect(() => getUserById("100")).toThrow(
        new BadRequestError("User with 100 not found"),
      );
    });

    it("Should return user if user is found", () => {
      const user = {
        id: "1",
        name: "test",
        email: "test@gmail.com",
        password: "test123",
        permissions: [],
      };
      userModelGetUserByIdStub.returns(user);
      const response = getUserById("1");
      expect(response).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: Sinon.SinonStub;
    let userModelCreateuserStub: Sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = Sinon.stub(bcrypt, "hash");
      userModelCreateuserStub = Sinon.stub(UserModel, "createUser");
    });
    afterEach(() => {
      bcryptHashStub.restore();
      userModelCreateuserStub.restore();
    });

    it("Should create new User", async () => {
      bcryptHashStub.resolves("hashedPassword");
      const user = {
        id: "1",
        name: "test",
        email: "test@gmail.com",
        password: "test123",
        permissions: [],
      };
      const response = await createUser(user);
      expect(response).toStrictEqual({ message: "User created" });
      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);
      expect(userModelCreateuserStub.callCount).toBe(1);
      expect(userModelCreateuserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });
});
