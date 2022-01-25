const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const { login, email, password } = req.body;
  if (password.length < 8) {
    res.json({ thisUser: false, message: 'Длина пароля должна быть больше 8 символов' });
  }
  let newUser;
  const equalUser = await User.findOne({
    where: {
      [Op.or]: [
        { login },
        { email },
      ],
    },
  });
  if (!equalUser) {
    const hashPassword = await bcrypt.hash(password, 10);
    newUser = await User.create({
      login,
      email,
      password: hashPassword,
    });
  } else {
    res.json({ thisUser: false, message: 'Юзер с таким логином или имейлом уже существует' });
  }
  if (newUser) {
    res.json({ thisUser: true, message: 'Регистрация прошла успешно!' });
  } else {
    res.json({ thisUser: false, message: 'Регистрация не прошла!' });
  }
});

module.exports = router;
