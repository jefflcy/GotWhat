const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

module.exports.getUser = async (req, res) => {
  try {
    const { user } = req;
    res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateOH = async (req, res) => {
  try {
    const { user } = req;
    const { operatingHours } = req.body;

    user.operatingHours = operatingHours;
    await user.save();

    res.json({ message: "Operating Hours updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateAddress = async (req, res) => {
  try {
    const { user } = req;
    const { address } = req.body;

    user.address = address;
    await user.save();

    res.json({ message: "Address updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateContact = async (req, res) => {
  try {
    const { user } = req;
    const { contact } = req.body;

    user.contact = contact;
    await user.save();

    res.json({ message: "Contact updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.uploadMenu = async (req, res) => {
  try {
    const cldRes = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "Menu",
    });
    // remove the file from the upload directory
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
    res.json(cldRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.updateMenuUrl = async (req, res) => {
  try {
    const { user } = req;
    const { newMenuUrl } = req.body;

    user.menuUrl = newMenuUrl;
    await user.save();

    res.json({ message: "Menu updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.uploadBanner = async (req, res) => {
  try {
    const cldRes = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "Banner",
      width: 1920,
      height: 500,
      crop: "fill",
    });
    // remove the file from the upload directory
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
    res.json(cldRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.updateBannerUrl = async (req, res) => {
  try {
    const { user } = req;
    const { newBannerUrl } = req.body;

    user.bannerUrl = newBannerUrl;
    await user.save();

    res.json({ message: "Banner updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.uploadAvatar = async (req, res) => {
  try {
    const cldRes = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "Avatar",
      width: 200,
      height: 200,
      crop: "fill",
    });
    // remove the file from the upload directory
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
    res.json(cldRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.updateAvatarUrl = async (req, res) => {
  try {
    const { user } = req;
    const { newAvatarUrl } = req.body;

    user.avatarUrl = newAvatarUrl;
    await user.save();

    res.json({ message: "Avatar updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
