const getEndPoints = () => {
  const endPointObj = {
    endpoints: { 'api': 'describes available endpoints', 'api/articles': 'get articles data', 'api/articles/:article_id': 'get article by article_id, patch article by article_id, delete article by article_id', 'api/article/:article_id/comments': 'get comments by article_id, post comments by article_id', 'api/comments/:comment_id': 'patch comments by comment_id, delete comments by comment_id', 'api/topics': 'get topics data', 'api/users/:user_id': 'get users by user_id' }
  };

  return endPointObj;
}

module.exports = { getEndPoints };