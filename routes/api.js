const apiRouter = require('express').Router();

const articleRouter = require('./articles');
const commentRouter = require('./comments');
const topicRouter = require('./topics');

const { methodNotAllowed } = require('../errors');

apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/topics', topicRouter);

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
