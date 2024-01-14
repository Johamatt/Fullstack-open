import bcrypt from "bcrypt";
import UserModel from "../models/user";
import { usersInDb } from "../tests/test_helper";
import supertest from "supertest";
import { app } from "../app";

const api = supertest(app);

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    try {
      await UserModel.deleteMany({});
    } catch (error) {
      console.log(error);
    }
    const gensalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("sekret", gensalt);
    const user = new UserModel({
      username: "root",
      passwordHash,
    });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u: any) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    try {
      const usersAtStart = await usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("expected `username` to be unique");

      const usersAtEnd = await usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    } catch (err) {
      console.log(err);
    }
  });
});
