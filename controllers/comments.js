const { patchComment, deleteComment } = require('../models/comments');

const amendComment = ((req, res, next) => {
  patchComment(req.body, req.params)
    .then(([commentPatch]) => {
      res.status(200).send({ commentPatch });
    })
    .catch(next)
});

const removeComment = ((req, res, next) => {
  deleteComment(req.params)
    .then(([commentDelete]) => {
      res.status(204).send({ commentDelete });
    })
    .catch(next);
});

module.exports = { amendComment, removeComment };