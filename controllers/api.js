const { getEndPoints } = require('../models/api');

const fetchEndPoints = ((req, res, next) => {
  res.status(200).send(getEndPoints());
});

module.exports = { fetchEndPoints };