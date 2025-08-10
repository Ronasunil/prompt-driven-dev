const { register, login } = require("./authService");

/**
 * Register route handler
 */
async function registerHandler(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  try {
    const user = await register(email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Login route handler
 */
async function loginHandler(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  try {
    const user = await login(email, password);
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { registerHandler, loginHandler };
