const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const BizOwner = require("../Models/BizOwnerModel");
const { TOKEN_KEY } = process.env;

module.exports.validate = async (req, res, next) => {
  const token = req.headers.authorization;

  const jwtToken = token.split("Bearer ")[1];

  if (!jwtToken) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  const { id } = jwt.verify(jwtToken, TOKEN_KEY);

  const [user, biz] = await Promise.all([
    User.findById(id),
    BizOwner.findById(id),
  ]);

  if (!user && !biz) {
    return res.status(404).json({ message: "User not found" });
  }

  let target = user || biz;

  req.user = target;
  next();
};

module.exports.isValidTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing token!" });
  }

  const jwtToken = token.split("Bearer ")[1];

  try {
    jwt.verify(jwtToken, TOKEN_KEY);
    next();
  } catch (error) {
    // catching jwt error here means jwtToken is undefined/expired
    return res.status(401).json({ message: "Invalid/Expired token!" });
  }
};
