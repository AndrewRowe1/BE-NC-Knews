exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  //console.log(err, 1)
  if (err.status) {
    res.status(err.status).send(err.msg);
  }
  if (err.code === '42703' || err.code === '22P02' || err.code === '23502') {
    //res.status(400).send({ msg: err.message || 'Bad Request' });
    res.status(400).send({ msg: 'Bad Request' });
  }
  if (err.code === '23503') {
    res.status(404).send({ msg: 'Page not found' });
  }
  else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
};
