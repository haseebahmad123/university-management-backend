const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, Vendor, Category } = require("../models");

const login = async (_req, _res, _next) => {
  try {
    const user = await User.findOne({ where: { email: _req.body.email } });
    if (!user) {
      return _res.status(401).json({ message: "Invalid Username or Password" });
    }
    const passwordIsValid = await bcrypt.compare(
      _req.body.password,
      user.dataValues.password
    );
    if (!passwordIsValid) {
      return _res.status(401).json({ message: "Invalid Username or Password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return _res.status(200).json({ token, user });
  } catch (error) {
    return _res.status(401).json({ error: error.message });
  }
};

module.exports = { login };
