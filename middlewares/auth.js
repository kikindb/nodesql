const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_PASSWORD || "jwtPassword"
    );
    req.user = decoded;
    const me = await User.findOne({
      attributes: ["id", "name", "email", "admin"],
      where: { id: req.user.id },
    });
    if (!me) return res.status(401).send("The user does not exist");
    req.user.admin = me.dataValues.admin;
    req.user.email = me.dataValues.email;
    req.user.name = me.dataValues.name;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token.");
  }
};
