const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, generateAuthToken } = require("../models/user");

async function getMyUserData(req, res) {
  const me = await User.findOne({
    attributes: ["id", "name", "email", "image", "admin"],
    where: { id: req.user.id },
  });
  return res.send(me);
}

async function getAllUsers(req, res) {
  const users = await User.findAll();
  res.send(users);
}

async function createUser(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "image"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  let userRes = await User.create({
    name: user.dataValues.name,
    email: user.dataValues.email,
    password: user.password,
    image: user.dataValues.image || null,
  });

  const token = generateAuthToken(userRes.id);

  return res
    .status(201)
    .header("x-auth-token", token)
    .send(_.pick(userRes, ["id", "name", "email", "image", "admin"]));
}

module.exports = {
  getMyUserData,
  getAllUsers,
  createUser,
};
