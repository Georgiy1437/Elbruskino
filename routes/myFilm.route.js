const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('myFilm');
});

module.exports = router;
