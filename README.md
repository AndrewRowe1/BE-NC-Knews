# Northcoders News

Northcoders News is a database of articles, together with comments, on distinct topics with a table of users. Users are able to create their new topics, create new articles, and contribute new comments for each individual article.  The articles and the comments are able to be voted upon by database users.  The testing database is used for testing purposes, with the development database pushed into production, using Heroku.  The repository was forked initially from the following Github repository: [https://github.com/northcoders/bend-nc-news]

A restful application programming interface (API) has been built, with the following endpoints specified at: [https://nc-news-andrewr.herokuapp.com/api/]

## Getting Started

### Setting up the project

The project generator Yo [https://www.npmjs.com/package/yo] has been used to create some boilerplate code for the application, using the specific project generator Knexpress, with the following terminal command:

npm i -g yo generator-knexpress

Once installed, the generator was ran with yo to create the project:

yo knexpress

This script created a new folder for the project, and initialised it as a git repository.

Finally, the development-data and test-data was copied and pasted into the db/data folder.

### Dependencies

Express: [https://expressjs.com/]

Knex: [https://www.npmjs.com/package/knex]

PostgreSQL: [https://www.npmjs.com/package/pg]

Cors: [https://www.npmjs.com/package/cors]

These packages are installed using the following command:

npm install express knex pg cors

### Development Dependencies

Mocha: [https://www.npmjs.com/package/mocha]

Chai: [https://www.npmjs.com/package/chai]

Supertest: [https://www.npmjs.com/package/supertest]

Nodemon: [https://www.npmjs.com/package/nodemon]

Mocha, Chai, Supertest and Nodemon are all installed as development dependencies, using the following command:

npm install -d mocha chai supertest nodemon

## Available Scripts

### Create development and test databases locally:

npm run setup-dbs

### Create the database (test and development)
npm migrate-make

### Use the latest database (test and development)
npm migrate-latest

### Rollback the last database change (test and development)
npm migrate-rollback

### Listen for changes on the browser
npm start

### Seed the development database
npm seed-dev

### Seed the test database
npm seed-test

### Seed the production database
npm seed:prod

### Use the latest production database
npm migrate:latest:prod

### Rollback the last production database change
npm migrate:rollback:prod

## Running The Tests

Using the terminal command:
npm test

This runs the testing scripts in spec/app.spec.js and spec/utils.spec.js

### utils.spec.js

Full Test Driven Development (TDD) was used to test individual utitlity functions, used to seed the database from the availble test database.  The tests on the utility functions use data created in the testing file, and test the functions only, without testing the database functionality.

### app.spec.js

Two sets of tests are made:

### Available Endpoints

Firstly requests are made to the database to test the available end points, to check that data is received from the database as expected.  Requests include GET, POST, PATCH and DELETE methods, specified on the relevant endpoints where the appropriate request methods are available to be used.

An example test is a GET request on the topics endpoint (/api/topics) in lines 30 to 40 of the file, which checks that the server responds with a status 200 code, that the first object in the array has keys of 'description' and 'slug', the value of the 'slug' key is equal to 'mitch', and the value of the 'description' key is 'The man, the Mitch, the legend'.

### Error Handling

Secondly, error handling tests have been created to test the error handling middleware functionality.  This checks that the database sends back sensible responses based on the individual error handling test.

An example test is a PATCH request on the topics endpoint (/api/topics) in lines 41 to 48 of the file.  A PATCH method has not been built for this endpoint, and the check is that the server responds with a status 405, with a message on the body of the request that the 'Method not allowed'.

## Deployment

Please see the hosting.md file for deploying the application to Heroku, at the Northcoders back end repository; [https://github.com/northcoders/bend-nc-news/blob/master/hosting.md].  This application is deployed at: [https://nc-news-andrewr.herokuapp.com/api/]

## Author

Andrew Rowe 2/6/2019
