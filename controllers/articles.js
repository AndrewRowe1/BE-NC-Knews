const { getArticles, getArticle, patchArticle, deleteArticle, getCommentsByArticleId, postCommentsByArticleId } = require('../models/articles');
const { getUsernames } = require('../models/users');
const { getTopicsSlug } = require('../models/topics');

const fetchArticles = ((req, res, next) => {

  if (req.query.order !== undefined) {
    const articleOrder = ['asc', 'desc'];
    const result = articleOrder.filter((element) => element === req.query.order);
    if (result.length === 0) {
      next({ status: 400, msg: 'Bad Request' })
    }
  }

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
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next)
});

const fetchArticle = ((req, res, next) => {
  getArticle(req.params)
    .then((article) => {
      if (article.length === 0) {
        next({ status: 404, msg: 'Page not found' });
      }
      else {
        res.status(200).send({ article });
      }
    })
    .catch(next)
});

const amendArticle = ((req, res, next) => {
  if ((Object.keys(req.body).length === 0)) {
    req.body = { inc_votes: 0 };
  }
  patchArticle(req.body, req.params)
    .then(([articlePatch]) => {
      if (articlePatch === undefined) {
        next({ status: 404, msg: 'Article not found' })
      }
      else {
        res.status(200).send({ articlePatch });
      }
    })
    .catch(next);
});

const removeArticle = ((req, res, next) => {
  deleteArticle(req.params)
    .then(([articleDelete]) => {
      if (articleDelete === undefined) {
        next({ status: 404, msg: 'Article not found' })
      }
      else {
        res.status(204).send({ articleDelete });
      }
    })
    .catch(next);
});

const fetchCommentsByArticleId = ((req, res, next) => {
  getCommentsByArticleId(req.params, req.query)
    .then((comments) => {
      if (comments.length === 0) {
        next({ status: 404, msg: 'Page not found' });
      }
      else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
});

const sendCommentsByArticleId = ((req, res, next) => {
  postCommentsByArticleId(req.params, req.body)
    .then((comments) => {
      //if (comments) next({msg: 'fgfdjvghj'})
      //else 
      res.status(201).send({ comments });
    })
    .catch(next)
  //.catch((err)=>next(err));
});

module.exports = { fetchArticles, fetchArticle, amendArticle, removeArticle, fetchCommentsByArticleId, sendCommentsByArticleId };