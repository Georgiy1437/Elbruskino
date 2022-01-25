const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const currentUser = await User.findOne({
    where: {
      email,
    },
  });
  if (!currentUser) {
    res.status(401).json({
      message: 'Юзер не найден!',
      auth: false,
    });
    return;
  }

  const correctPassword = await bcrypt.compare(password, currentUser.password);
  if (!correctPassword) {
    res.status(401).json({
      message: 'Пароль некорректный!',
      auth: false,
    });
    return;
  }
  req.session.user = {
    id: currentUser.id,
    login: currentUser.login,
    email,
    signedUp: true,
  };
  res.json({
    message: 'Логин успешный!',
    auth: true,
  });
});
module.exports = router;
