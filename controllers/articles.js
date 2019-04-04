const { getArticles, getArticle, patchArticle, deleteArticle, getCommentsByArticleId, postCommentsByArticleId } = require('../models/articles');

const fetchArticles = ((req, res, next) => {
  const articleOrderSort = ['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at'];
  if (req.query.sort_by !== undefined) {
    const result = articleOrderSort.filter((element) => element === req.query.sort_by);
    if (result.length === 0) {
      next({ status: 400, msg: 'Bad Request' })
    }
  }
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
      res.status(200).send({ comments });
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