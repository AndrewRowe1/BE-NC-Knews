const { getUsers, getUserByUserId, getUsernames, postUser } = require('../models/users');

const fetchUsers = ((req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next)
});

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

const sendUser = ((req, res, next) => {
  if (req.body.username === undefined || req.body.name === undefined || req.body.avatar_url === undefined) {
    next({ status: 400, msg: 'Required keys not on request' });
  }
  else {
    getUsernames()
      .then((getUsers) => {
        const userExists = getUsers.filter(element => element.username === req.body.username);
        if (userExists.length > 0) {
          next({ status: 422, msg: 'Unprocessable entry, username already exists' });
        }
        else {
          postUser(req.body)
            .then(([user]) => {
              res.status(201).send({ user });
            })
            .catch(next)
        };
      });
  };
});

module.exports = { fetchUsers, sendUser, fetchUserByUserId };