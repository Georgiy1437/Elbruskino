const router = require('express').Router();
const { Party } = require('../db/models');

router.get('/', async (req, res) => {
  const parties = await Party.findAll({
    order: [
      ['starts_at', 'ASC'],
    ],
  });
  res.render('index', { parties });
});

module.exports = router;
