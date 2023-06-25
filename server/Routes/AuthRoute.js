const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/UserModel");

/* Import Controllers */
const { Signup, Login } = require("../Controllers/AuthController");

/* Import Middlewares */
const { userValidator, validate } = require("../Middlewares/AuthValidator");

/* Post Routes */
router.post("/signup", userValidator, validate, Signup);
router.post("/login", Login);

/* Get Routes */
router.get("/is-auth", async (req, res) => {
  const token = req.headers.authorization;
  const jwtToken = token.split("Bearer ")[1];
  if (!jwtToken) return sendError(res, "No token provided", 401);
  const jwtRes = jwt.verify(jwtToken, process.env.TOKEN_KEY);
  const { id } = jwtRes;
  const user = await User.findById(id);
  if (!user) return sendError(res, "User not found", 404);
  res.status(200).json({ user });
});

module.exports = router;
