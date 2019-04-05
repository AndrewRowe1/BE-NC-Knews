const { getArticles, getArticle, getArticleIds, patchArticle, deleteArticle, getCommentsByArticleId, postCommentsByArticleId } = require('../models/articles');
const { getUsernames } = require('../models/users');
const { getTopicsSlug } = require('../models/topics');

const fetchArticles = ((req, res, next) => {

  if (req.query.order !== undefined) {
    const articleOrder = ['asc', 'desc'];
    const result = articleOrder.filter((element) => element === req.query.order);
    if (result.length === 0) {
      next({ status: 400, msg: 'Bad Request' })
    }
  };

  if (req.query.author !== undefined) {
    getUsernames(req.query)
      .then((users) => {
        const authorExists = users.filter(element => element.username === req.query.author);
        if (authorExists.length === 0) {
          next({ status: 404, msg: 'Author not found' })
        }
      })
      .catch(next);
  };

  if (req.query.topic !== undefined) {
    getTopicsSlug(req.query)
      .then((topics) => {
        const topicExists = topics.filter(element => element.slug === req.query.topic);
        if (topicExists.length === 0) {
          next({ status: 404, msg: 'Topic not found' })
        }
      })
      .catch(next);
  };

  getArticles(req.query)
    .then(([articles]) => {
      if (articles === undefined) {
        res.status(200).send({ articles: [] });
      }
      else {
        res.status(200).send({ articles });
      }
    })
    .catch(next)
});

const fetchArticle = ((req, res, next) => {
  getArticle(req.params)
    .then(([article]) => {
      if (article === undefined) {
        next({ status: 404, msg: 'Page not found' });
      }
      else {
        res.status(200).send({ article });
      }
    })
    .catch(next)
});

const amendArticle = ((req, res, next) => {
  patchArticle(req.body, req.params)
    .then(([article]) => {
      if (article === undefined) {
        next({ status: 404, msg: 'Article not found' })
      }
      else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
});

const removeArticle = ((req, res, next) => {
  deleteArticle(req.params)
    .then(([article]) => {
      if (article === undefined) {
        next({ status: 404, msg: 'Article not found' })
      }
      else {
        res.status(204).send({ article });
      }
    })
    .catch(next);
});

const fetchCommentsByArticleId = ((req, res, next) => {
  Promise.all([getArticleIds(), getCommentsByArticleId(req.params, req.query)])
    .then(([articleIds, [comments]]) => {
      const articleIdExists = articleIds.filter(element => element.article_id === parseInt(req.params.article_id));
      if (articleIdExists.length === 0) {
        next({ status: 404, msg: 'Page not found' });
      }
      else if (comments === undefined) {
        res.status(200).send({ comments: [] });
      }
      else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
});

const sendCommentsByArticleId = ((req, res, next) => {
  if (req.body.username === undefined) {
    next({ status: 400, msg: 'No username key on request' });
  }
  else {
    getUsernames(req.body.username)
      .then((users) => {
        const authorExists = users.filter(element => element.username === req.body.username);
        if (authorExists.length === 0) {
          return Promise.reject({ status: 400, msg: 'Author does not exist' });
        }
        else {
          return postCommentsByArticleId(req.params, req.body);
        };
      })
      .then(([comments]) => {
        //if (comments) next({msg: 'fgfdjvghj'})
        //else
        res.status(201).send({ comments });
      })
      .catch(next)
  };
});

module.exports = { fetchArticles, fetchArticle, amendArticle, removeArticle, fetchCommentsByArticleId, sendCommentsByArticleId };