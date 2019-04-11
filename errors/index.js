exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleErrorStatus = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.msg);
  }
  else next(err);
}

exports.handle400 = (err, req, res, next) => {
  if (err.code === '42703' || err.code === '22P02' || err.code === '23502') {
    res.status(400).send({ msg: 'Bad Request' });
  }
  else next(err);
}

exports.handle404 = (err, req, res, next) => {
  if (err.code === '23503') {
    res.status(404).send({ msg: 'Page not found' });
  }
  else next(err);
}

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
