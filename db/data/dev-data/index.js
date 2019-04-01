// require in and export out all dev data
const articlesData = require('./articles.js');
const commentsData = require('./comments.js');
const topicsData = require('./topics.js');
const usersData = require('./users.js');

module.exports = { articlesData, commentsData, topicsData, usersData };
