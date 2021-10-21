const router = require('express').Router();
const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, generateAuthToken } = require('../models/user');

//Get current user
router.get('/me', auth, async (req, res) => {
  const me = await User.findOne({
    attributes: ['id', 'name', 'email', 'image'],
    where: { id: req.user.id }
  });
  res.send(me);
});

//Get All Users
router.get('/', auth, async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'image']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  console.log(user.dataValues);
  let userRes = await User.create({
    name: user.dataValues.name,
    email: user.dataValues.email,
    password: user.password,
    image: user.dataValues.image || null
  });

  const token = generateAuthToken();

  res.status(201).header('x-auth-token', token).send(_.pick(userRes, ['id', 'name', 'email']));
});

module.exports = router;