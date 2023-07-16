const router = require("express").Router();

//Import Controller
const { getUser, updatePassword } = require('../Controllers/DashboardController');

//Import Middlewares
const {
    signupValidator,
    loginValidator,
    validate,
  } = require("../Middlewares/AuthValidator");

//Get Route to retrive user information
router.get('/', validate, getUser);

//Post Route to update user password
router.put('/password', validate, updatePassword);

module.exports = router;