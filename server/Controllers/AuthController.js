const User = require("../Models/UserModel");
const BizOwner = require("../Models/BizOwnerModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let model;
    role === "user" ? (model = User) : (model = BizOwner);

    // Check if user/biz exists
    const { existingUser, existingBiz } = await Promise.all([
      User.findOne({ email }),
      BizOwner.findOne({ email }),
    ]);

    if (existingUser || existingBiz) {
      return res.status(401).json({ message: "User already exists" });
    }

    // Create the new user/biz in UserModel/BizOwnerModel
    const user = await model.create({
      email,
      password,
    });

    // Create token and send it in a cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "Signed up successfully", success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user/biz exists
    const { existingUser, existingBiz } = await Promise.all([
      User.findOne({ email }),
      BizOwner.findOne({ email }),
    ]);
    if (!existingUser && !existingBiz) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    let account = existingUser || existingBiz;

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email/password!" });
    }

    // Create token and send it in a cookie
    const token = createSecretToken(account._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "Signed in successfully", success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
