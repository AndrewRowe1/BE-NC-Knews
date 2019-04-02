const getTopics = require('../models/topics');

const fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next)
});

module.exports = fetchTopics;