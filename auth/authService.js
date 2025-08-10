const { users } = require("./authModel");
const bcrypt = require("bcryptjs");

/**
 * Register a new user
 */
async function register(email, password) {
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error("User already exists");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { email, password: hashed };
  users.push(user);
  return { email };
}

/**
 * Login a user
 */
async function login(email, password) {
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }
  return { email };
}

module.exports = { register, login };
