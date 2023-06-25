const router = require("express").Router();

/* Import Controllers */
const { Signup, Login } = require("../Controllers/AuthController");

/* Import Middlewares */
const { userValidator, validate } = require("../Middlewares/AuthValidator");

/* Post Routes */
router.post("/signup", userValidator, validate, Signup);
router.post("/login", Login);

module.exports = router;
