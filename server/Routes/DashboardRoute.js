const router = require("express").Router();

/* Import Controllers */
const {
  getUser,
  updatePassword,
  updateOH,
  updateAddress,
  updateContact,
  uploadAvatar,
  updateAvatarUrl,
  uploadMenu,
  updateMenuUrl,
  uploadBanner,
  updateBannerUrl,
} = require("../Controllers/DashboardController");

/* Import Middlewares */
const {
  validate,
  isValidTokenMiddleware,
} = require("../Middlewares/AuthLoginValidator");
const { upload } = require("../Middlewares/Multer");
const {
  resetPasswordValidator,
  validator,
} = require("../Middlewares/AuthValidator");

/* Get Routes */
router.get("/user", validate, getUser);

/* Patch Routes */
router.patch(
  "/user/password",
  validate,
  resetPasswordValidator,
  validator,
  updatePassword
);
router.patch("/user/OH", validate, updateOH);
router.patch("/user/address", validate, updateAddress);
router.patch("/user/contact", validate, updateContact);
router.patch("/user/menu", validate, updateMenuUrl);
router.patch("/user/banner", validate, updateBannerUrl);
router.patch("/user/avatar", validate, updateAvatarUrl);

/* Post Routes */
router.post(
  "/user/uploadavatar",
  isValidTokenMiddleware,
  upload.single("avatarImg"),
  uploadAvatar
);
router.post(
  "/user/uploadmenu",
  isValidTokenMiddleware,
  upload.single("pdfFile"),
  uploadMenu
);
router.post(
  "/user/uploadbanner",
  isValidTokenMiddleware,
  upload.single("bannerImg"),
  uploadBanner
);

module.exports = router;
