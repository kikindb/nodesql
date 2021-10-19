const router = require('express').Router();
const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');

//Get current user
// router.get('/me', auth, async (req, res) => {
//   const me = await User.findById(req.user._id).select(['-password', '-createdAt', '-isActive', '-role']);
//   res.send(me);
// });

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
  await User.create({
    name: user.dataValues.name,
    email: user.dataValues.email,
    password: user.password,
    image: user.dataValues.image || null
  });

  res.send("Hola");
});

module.exports = router;