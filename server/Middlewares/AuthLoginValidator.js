const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const BizOwner = require("../Models/BizOwnerModel");
const { TOKEN_KEY } = process.env;

exports.validate = async (req, res, next) => {
    const token = req.headers.authorization;

    const jwtToken = token.split("Bearer ")[1];
    
    if (!jwtToken) {
        return res
            .status(401)
            .json({ message: "Invalid token!" });
    }

    const decode = jwt.verify(jwtToken, TOKEN_KEY);
    const { id } = decode;

    const [user, biz] = await Promise.all([
        User.findById(id),
        BizOwner.findById(id),
    ]);

    if (!user && !biz) {
        return res
            .status(404)
            .json({ message: 'User not found' });
    }

    const target = user || biz;

    req.user = target;
    //console.log(req);
    next();
};
