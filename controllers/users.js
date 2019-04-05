const { getUserByUserId } = require('../models/users');

const fetchUserByUserId = ((req, res, next) => {
  getUserByUserId(req.params)
    .then(([users]) => {
      if (users === undefined) {
        next({ status: 404, msg: 'Page not found' });
      }
      else {
        res.status(200).send({ users });
      }
    })
    .catch(next)
});

module.exports = fetchUserByUserId;