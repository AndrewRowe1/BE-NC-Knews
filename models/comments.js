const connection = require('../db/connection');

const patchComment = (commentPatch, commentId) => {
  const voteIncrement = commentPatch.inc_votes;
  const commentIdInt = commentId.comment_id;
  return connection('comments').where('comment_id', '=', commentIdInt).increment('votes', voteIncrement).returning('*');
};

module.exports = patchComment;