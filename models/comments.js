const connection = require('../db/connection');

const patchComment = (commentPatch, commentId) => {
  const voteIncrement = commentPatch.inc_votes || 0;
  const commentIdInt = commentId.comment_id;
  return connection('comments').where('comment_id', '=', commentIdInt).increment('votes', voteIncrement).returning('*');
};

const deleteComment = (commentId) => {
  const commentIdInt = commentId.comment_id;
  return connection('comments').del().where('comment_id', '=', commentIdInt).returning('*');
};

module.exports = { patchComment, deleteComment };