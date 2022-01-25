module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.id = req.session.user.id;
    res.locals.login = req.session.user.login;
    res.locals.email = req.session.user.email;
    res.locals.signedUp = req.session.user.signedUp;
  } else {
    res.locals.signedUp = false;
  }
  next();
};
