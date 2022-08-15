const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, generateAuthToken } = require("./../models/user");

async function authenticate(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user)
    return res.status(400).send({ message: "Invalid email or password." });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password" });

  const token = generateAuthToken(user.id);
  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["id", "name", "email", "image", "admin"]));
}

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = { authenticate };
