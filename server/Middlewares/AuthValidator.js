const { check, validationResult } = require("express-validator");

const checkValidEmail = () => {
  return check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is invalid!");
};

const checkValidPassword = () => {
  return check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is invalid!");
};

module.exports.signupValidator = [
  checkValidEmail(),
  checkValidPassword()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

module.exports.loginValidator = [checkValidEmail(), checkValidPassword()];

module.exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(400).json({ error: error[0].msg });
  }

  next();
};
