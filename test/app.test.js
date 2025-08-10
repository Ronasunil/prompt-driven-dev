const request = require("supertest");
const express = require("express");

// Mock the auth service to isolate tests
jest.mock("../libs/auth/authService", () => ({
  register: jest.fn(async (email, password) => {
    if (email === "exists@example.com") throw new Error("User already exists");
    return { email };
  }),
  login: jest.fn(async (email, password) => {
    if (email !== "user@example.com" || password !== "password")
      throw new Error("Invalid credentials");
    return { email };
  }),
}));

const {
  registerHandler,
  loginHandler,
} = require("../libs/auth/authController");

const app = express();
app.use(express.json());
app.post("/register", registerHandler);
app.post("/login", loginHandler);

describe("Auth Routes", () => {
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/register")
        .send({ email: "new@example.com", password: "password" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "User registered");
      expect(res.body.user).toHaveProperty("email", "new@example.com");
    });

    it("should not register an existing user", async () => {
      const res = await request(app)
        .post("/register")
        .send({ email: "exists@example.com", password: "password" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "User already exists");
    });

    it("should require email and password", async () => {
      const res = await request(app).post("/register").send({ email: "" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("POST /login", () => {
    it("should login a user with correct credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "user@example.com", password: "password" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login successful");
      expect(res.body.user).toHaveProperty("email", "user@example.com");
    });

    it("should not login with invalid credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "user@example.com", password: "wrong" });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should require email and password", async () => {
      const res = await request(app).post("/login").send({ email: "" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
