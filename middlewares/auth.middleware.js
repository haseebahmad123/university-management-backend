const jwt = require("jsonwebtoken");
const { User, Vendor, Category } = require("../models");

const authMiddleware = async (_req, _res, _next) => {
  try {
    const token = (_req.headers.authorization || "").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;

    const user = await User.findOne({where:{
      id: userId,
    }});

    if (user) {
      _req.userId = userId;
      _req.user = user;
      return _next();
    }

    throw new Error("Invalid user ID");
  } catch (error) {
    _res.status(401).json({ statusCode:401, error: "Unauthorized" });
  }
};

const isAdmin = async (_req, _res, _next) => {
  try {
    const token = (_req.headers.authorization || "").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;

    const user = await User.findOne({where:{
      id: userId,
    }});

    if (user && user.role === 'admin') {
      _req.userId = userId;
      _req.user = user;
      return _next();
    }
    throw new Error("Invalid user ID");
  } catch (error) {
    _res.status(401).json({ statusCode:401, error: "Unauthorized" });
  }
};

module.exports = { authMiddleware, isAdmin };
