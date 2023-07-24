const router = require("express").Router();

/* Import Controllers */
const {
  Signup,
  Login,
  isValidToken,
} = require("../Controllers/AuthController");

/* Import Middlewares */
const {
  signupValidator,
  loginValidator,
  validator,
} = require("../Middlewares/AuthValidator");

/* Post Routes */
router.post("/signup", signupValidator, validator, Signup);
router.post("/login", loginValidator, validator, Login);

/* Get Routes */
router.get("/isValidToken", isValidToken);

module.exports = router;
