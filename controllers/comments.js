const { patchComment, deleteComment } = require('../models/comments');

const amendComment = ((req, res, next) => {
  if (req.body.inc_votes === undefined && Object.keys(req.body).length > 0) {
    next({ status: 400, msg: 'No inc_votes key on request' });
  }
  else {
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
  }
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