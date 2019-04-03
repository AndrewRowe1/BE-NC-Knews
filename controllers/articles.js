const { getArticles, getArticle, patchArticle, deleteArticle, getCommentsByArticleId, postCommentsByArticleId } = require('../models/articles');

const fetchArticles = ((req, res, next) => {
  getArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next)
});

const fetchArticle = ((req, res, next) => {
  getArticle(req.params)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next)
});

const amendArticle = ((req, res, next) => {
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
      res.status(204).send({ articleDelete });
    })
    .catch(next);
});

const fetchCommentsByArticleId = ((req, res, next) => {
  getCommentsByArticleId(req.params, req.query)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
});

const sendCommentsByArticleId = ((req, res, next) => {
  postCommentsByArticleId(req.params, req.body)
    .then((comments) => {
      res.status(201).send({ comments });
    })
    .catch(next);
});

module.exports = { fetchArticles, fetchArticle, amendArticle, removeArticle, fetchCommentsByArticleId, sendCommentsByArticleId };