const express = require("express");
const app = express();
app.use(express.json());

const { registerHandler, loginHandler } = require("./libs/auth/authController");

app.post("/register", registerHandler);
app.post("/login", loginHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
