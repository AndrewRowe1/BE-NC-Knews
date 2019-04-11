const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handleErrorStatus, handle400, handle404, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

// error handling middleware
app.use(handleErrorStatus);
app.use(handle400);
app.use(handle404);
app.use(handle500);

module.exports = app;
