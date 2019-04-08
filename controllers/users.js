const { getUserByUserId } = require('../models/users');

const fetchUserByUserId = ((req, res, next) => {
  getUserByUserId(req.params)
    .then(([user]) => {
      if (user === undefined) {
        next({ status: 404, msg: 'Page not found' });
      }
      else {
        res.status(200).send({ user });
      }
    })
    .catch(next)
});

module.exports = fetchUserByUserId;