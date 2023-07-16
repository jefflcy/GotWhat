const User = require("../Models/UserModel");
const BizOwner = require("../Models/BizOwnerModel");
const bcrypt = require("bcryptjs");


module.exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const [user, biz] = await Promise.all([
            User.findById(userId),
            BizOwner.findById(userId),
        ]);

        if (!user && !biz) {
            return res
            .status(404)
            .json({ message: 'User not found' });
        }

        if (user) {
            res.json({ user })
        } else {
            res.json({ biz })
        }
    } catch (error) {
        return res
        .status(500)
        .json({ message: 'Internal server error' });
    }
};

module.exports.updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        const [user, biz] = await Promise.all([
            User.findById(userId),
            BizOwner.findById(userId),
        ]);

        if (!user && !biz) {
            return res
            .status(404)
            .json({ message: 'User not found' });
        }

        const { currentPassword, newPassword } = req.body;

        const target = {};

        if (user) {
            target = user;
        } else {
            target = biz;
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, target.password)
        if (!isPasswordValid) {
            return res
            .status(401)
            .json({ message: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        target.password = hashedNewPassword;
        await target.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};