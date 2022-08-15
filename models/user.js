const Sequelize = require("sequelize");
const sequelize = require("../startup/db");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const User = sequelize.define("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT.UNSIGNED,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: Sequelize.STRING,
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

const generateAuthToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_PASSWORD || "jwtPassword");
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(255)
      .required()
      .regex(/^[\w][\w\s]*$/),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.generateAuthToken = generateAuthToken;
