const { patchComment, deleteComment } = require('../models/comments');

const amendComment = ((req, res, next) => {
  patchComment(req.body, req.params)
    .then(([comment]) => {
      if (comment === undefined) {
        next({ status: 404, msg: 'Comment not found' })
      }
      else {
        res.status(200).send({ comment });
      }
    })
    .catch(next)
});

const removeComment = ((req, res, next) => {
  deleteComment(req.params)
    .then(([comment]) => {
      if (comment === undefined) {
        next({ status: 404, msg: 'Comment not found' })
      }
      else {
        res.status(204).send({ comment });
      }
    })
    .catch(next);
});

module.exports = { amendComment, removeComment };