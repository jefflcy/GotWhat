const router = require("express").Router();

//Import Controller
const { getUser, updatePassword } = require('../Controllers/DashboardController');

//Import Middlewares
const { validate } = require("../Middlewares/AuthLoginValidator");

//Get Route to retrive user information
router.get('/user', validate, getUser);

//Post Route to update user password
router.patch('/user/password', validate, updatePassword);

module.exports = router;