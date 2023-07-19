const bcrypt = require("bcryptjs");
const cloudinary = require('cloudinary').v2;


module.exports.getUser = async (req, res) => {
    try {
        const { user } = req;
        res.json({ user });
    } catch (error) {
        return res
        .status(500)
        .json({ message: 'Internal server error' });
    }
};

module.exports.updatePassword = async (req, res) => {
    try {
        const { user } = req;
        const { currentPassword, newPassword } = req.body;
        //console.log(req.body);

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
        //console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res
            .status(401)
            .json({ message: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.updateMenu = async (req, res) => {
    try {
        const { path } = req.files.file;

        const result = await cloudinary.uploader.upload(path);

        const fileUrl = result.secure_url;

        //save fileUrl to database

        res.json({ fileUrl });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to upload file' });
    }
};

module.exports.updateMenuUrl = async (req, res) => {
    try {
        const { user } = req;
        const { newMenuUrl } = req.body;

        user.menuUrl = newMenuUrl;
        await user.save();

        res.json({ message: 'Menu updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.updateBanner = async (req, res) => {
    try {
        const { path } = req.files.file;

        const result = await cloudinary.uploader.upload(path);

        const fileUrl = result.secure_url;

        //save fileUrl to database

        res.json({ fileUrl });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to upload file' });
    }
};

module.exports.updateBannerUrl = async (req, res) => {
    try {
        const { user } = req;
        const { newBannerUrl } = req.body;

        user.bannerUrl = newBannerUrl;
        await user.save();

        res.json({ message: 'Banner updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}