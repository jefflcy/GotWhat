const User = require("../Models/UserModel");
const BizOwner = require("../Models/BizOwnerModel");
const bcrypt = require("bcryptjs");


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