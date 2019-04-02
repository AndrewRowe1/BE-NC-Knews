const apiRouter = require('express').Router();
const topicRouter = require('./topics');
const { methodNotAllowed } = require('../errors');

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/topics', topicRouter);

module.exports = apiRouter;
