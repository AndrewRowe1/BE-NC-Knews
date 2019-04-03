const patchComment = require('../models/comments');

const amendComment = ((req, res, next) => {
  patchComment(req.body, req.params)
    .then(([commentPatch]) => {
      res.status(200).send({ commentPatch });
    })
    .catch(next)
});

module.exports = amendComment;