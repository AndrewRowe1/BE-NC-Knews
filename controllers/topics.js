const { getTopics, postTopic } = require('../models/topics');

const fetchTopics = ((req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next)
});

const sendTopic = ((req, res, next) => {
  if (req.body.slug === undefined || req.body.description === undefined) {
    next({ status: 400, msg: 'Required keys not on request' });
  }
  else {
    getTopics()
      .then((getTopics) => {
        const topicExists = getTopics.filter(element => element.slug === req.body.slug);
        if (topicExists.length > 0) {
          next({ status: 422, msg: 'Unprocessable entry, topic(slug) already exists' });
        }
        else {
          postTopic(req.body)
            .then(([topic]) => {
              res.status(201).send({ topic });
            })
            .catch(next)
        };
      });
  };
});

module.exports = { fetchTopics, sendTopic };