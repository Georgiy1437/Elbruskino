const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('top100');
});

module.exports = router;
