const apiRouter = require('express').Router();
const topicRouter = require('./topics');
const articleRouter = require('./articles');
const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
