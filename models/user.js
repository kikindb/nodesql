const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: Sequelize.STRING
});

const generateAuthToken = function (id) {
  const token = jwt.sign({ id }, "jwtPassword");
  return token;
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required().regex(/^[\w][\w\s]*$/),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.generateAuthToken = generateAuthToken;