const router = require("express").Router();

//Import Controller
//const { getUser, updatePassword, uploadMenu, updateMenuUrl, updateBanner, updateBannerUrl } = require('../Controllers/DashboardController');
const { getUser, updatePassword, updateOH, updateAddress, updateContact, uploadMenu, updateMenuUrl, } = require('../Controllers/DashboardController');

//Import Middlewares
const { validate } = require("../Middlewares/AuthLoginValidator");
const { upload } = require("../Middlewares/Multer");

//Get Route to retrive user information
router.get('/user', validate, getUser);

//Patch Route to update user password
router.patch('/user/password', validate, updatePassword);

//Patch Route to update user operating hours
router.patch('/user/OH', validate, updateOH);

//Patch Route to update user address
router.patch('/user/address', validate, updateAddress);

//Patch Route to update user operating hours
router.patch('/user/contact', validate, updateContact);

//Post Route to update/create PDF menu
router.post('/user/uploadmenu', upload.single('pdfFile'), uploadMenu);

//Patch Route to update user menu Url
router.patch('/user/menu', validate, updateMenuUrl);

//Patch Route to update/create Img banner
//router.patch('/user/uploadbanner', validate, updateBanner);

//Patch Route to update user banner Url
//router.patch('/user/banner', validate, updateBannerUrl);

module.exports = router;