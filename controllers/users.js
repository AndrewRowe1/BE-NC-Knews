const { getUserByUserId } = require('../models/users');

const fetchUserByUserId = ((req, res, next) => {
  getUserByUserId(req.params)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next)
});

module.exports = fetchUserByUserId;