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

module.exports.updateOH = async (req, res) => {
    try {
        const { user } = req;
        const { operatingHours } = req.body;
        //console.log(req.body);

        user.operatingHours = operatingHours;
        await user.save();

        res.json({ message: 'Operating Hours updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.updateAddress = async (req, res) => {
    try {
        const { user } = req;
        const { address } = req.body;

        user.address = address;
        await user.save();

        res.json({ message: 'Address updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.updateContact = async (req, res) => {
    try {
        const { user } = req;
        const { contact } = req.body;

        user.contact = contact;
        await user.save();

        res.json({ message: 'Contact updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.uploadMenu = async (req, res) => {
    try {

        if (!req.file) {
            return res
                    .status(400)
                    .json({ message: 'No file uploaded' });
       }

        //const menuFile = req.get('file');
        //const user = req.get('user');
        const { file } = req.files;
        //const { path } = req.files.file;

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'pdf_files', //specify folder in Cloudinary to upload to, can change if you want
            resource_type: 'auto', //auto determine the type of upload
        });

        const fileUrl = result.secure_url;
    
        //save fileUrl to database
        //user.menuUrl = fileUrl;
        //await user.save();

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

/*module.exports.updateBanner = async (req, res) => {
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
}*/