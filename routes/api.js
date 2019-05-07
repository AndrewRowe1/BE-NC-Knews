const apiRouter = require('express').Router();

const articleRouter = require('./articles');
const commentRouter = require('./comments');
const topicRouter = require('./topics');
const userRouter = require('./users');

const { fetchEndPoints } = require('../controllers/api');

const { methodNotAllowed } = require('../errors');

apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/topics', topicRouter);
apiRouter.use('/users', userRouter);

console.log('gets here')

apiRouter
  .route('/')
  .get(fetchEndPoints)
  .all(methodNotAllowed);

module.exports = apiRouter;
