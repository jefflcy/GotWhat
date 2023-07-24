const User = require("../Models/UserModel");
const BizOwner = require("../Models/BizOwnerModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

module.exports.Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let model;
    role === "User" ? (model = User) : (model = BizOwner);

    // Check if user/biz exists
    const [existingUser, existingBiz] = await Promise.all([
      User.findOne({ email }),
      BizOwner.findOne({ email }),
    ]);

    if (existingUser || existingBiz) {
      return res.status(401).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user/biz in UserModel/BizOwnerModel
    const user = await model.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Signed up successfully\nYou may now login",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user/biz exists
    const [existingUser, existingBiz] = await Promise.all([
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

module.exports.isValidToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing token!", valid: false });
  }

  const jwtToken = token.split("Bearer ")[1];

  try {
    jwt.verify(jwtToken, TOKEN_KEY);
    res.status(200).json({ message: "Valid token!", valid: true });
  } catch (error) {
    // catching jwt error here means jwtToken is undefined/expired
    return res
      .status(401)
      .json({ message: "Invalid/Expired token!", valid: false });
  }
};
