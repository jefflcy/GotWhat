const router = require("express").Router();

/* Import Controllers */
const { Signup, Login } = require("../Controllers/AuthController");

/* Import Middlewares */
const {
  signupValidator,
  loginValidator,
  validate,
} = require("../Middlewares/AuthValidator");

/* Post Routes */
router.post("/signup", signupValidator, validate, Signup);
router.post("/login", loginValidator, validate, Login);

/* Get Routes */

module.exports = router;
