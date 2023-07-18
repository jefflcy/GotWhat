const router = require("express").Router();

//Import Controller
const { getUser, updatePassword, updateMenu, updateMenuUrl, updateBanner, updateBannerUrl } = require('../Controllers/DashboardController');

//Import Middlewares
const { validate } = require("../Middlewares/AuthLoginValidator");

//Get Route to retrive user information
router.get('/user', validate, getUser);

//Patch Route to update user password
router.patch('/user/password', validate, updatePassword);

//Patch Route to update/create PDF menu
router.patch('/user/upload', validate, updateMenu);

//Patch Route to update user menu Url
router.patch('/user/menu', validate, updateMenuUrl);

//Patch Route to update/create Img banner
router.patch('/user/upload', validate, updateBanner);

//Patch Route to update user banner Url
router.patch('/user/menu', validate, updateBannerUrl);

module.exports = router;