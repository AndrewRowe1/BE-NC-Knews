const topicRouter = require('express').Router();
const { fetchTopics, sendTopic } = require('../controllers/topics')
const { methodNotAllowed } = require('../errors');

topicRouter
  .route('/')
  .get(fetchTopics)
  .post(sendTopic)
  .all(methodNotAllowed);

module.exports = topicRouter;