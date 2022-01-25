const router = require('express').Router();

router.get('/:id', (req, res) => {
  res.render('movie', { filmId: req.params.id });
});

module.exports = router;
