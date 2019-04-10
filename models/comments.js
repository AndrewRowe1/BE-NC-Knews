const connection = require('../db/connection');

const patchComment = ({ inc_votes }, { comment_id }) => {
  return connection('comments').where('comment_id', '=', comment_id).increment('votes', inc_votes || 0).returning('*');
};

const deleteComment = ({ comment_id }) => {
  return connection('comments').del().where('comment_id', '=', comment_id).returning('*');
};

module.exports = { patchComment, deleteComment };