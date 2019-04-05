const connection = require('../db/connection');

const getArticles = ({ author, topic, sort_by, order }) => {
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at',
      'articles.votes')
    .count('comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .modify((query) => {
      if (author) {
        query.where({ 'articles.author': author });
      };
      if (topic) {
        query.where({ topic });
      };
      if (sort_by) {
        query.orderBy(sort_by, 'desc');
      }
      else {
        query.orderBy('articles.created_at', order || 'desc');
      }
      if (order) {
        query.orderBy('articles.created_at', order || 'desc');
      }
    })
    .groupBy('articles.article_id');
}

const getArticle = ({ article_id }) => {
  return connection.select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .count('comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .where({ 'articles.article_id': article_id })
    .groupBy('articles.article_id');
}

const getArticleIds = () => {
  return connection.select('article_id')
    .from('articles');
}

const patchArticle = (articlePatch, { article_id }) => {
  const voteIncrement = articlePatch.inc_votes || 0;
  return connection('articles').where('article_id', '=', article_id).increment('votes', voteIncrement).returning('*');
};

const deleteArticle = (articleId) => {
  const articleIdInt = articleId.article_id;
  return connection('articles').del().where('article_id', '=', articleIdInt).returning('*');
};

const getCommentsByArticleId = ({ article_id }, { sort_by, order }) => {
  return connection('comments')
    .select('*')
    .where('article_id', '=', article_id)
    .modify((query) => {
      if (sort_by) {
        query.orderBy(sort_by || 'created_at', 'desc');
      };
      if (order) {
        query.orderBy('created_at', order || 'desc');
      }
    });
};

const postCommentsByArticleId = (articleId, request) => {
  const articleid = parseInt(articleId.article_id);
  const insertObj = { author: request.username, body: request.body, article_id: articleid };
  return connection('comments')
    .insert(insertObj)
    .where('article_id', '=', articleid)
    .returning('*');
};

module.exports = { getArticles, getArticle, getArticleIds, patchArticle, deleteArticle, getCommentsByArticleId, postCommentsByArticleId };